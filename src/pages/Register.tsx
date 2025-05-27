
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const businessTypes = [
    t('register.businessTypes.generalStore'),
    t('register.businessTypes.restaurant'),
    t('register.businessTypes.electronics'),
    t('register.businessTypes.fashion'),
    t('register.businessTypes.agriculture'),
    t('register.businessTypes.services'),
    t('register.businessTypes.other')
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = t('register.errors.firstNameRequired');
    if (!formData.lastName.trim()) newErrors.lastName = t('register.errors.lastNameRequired');
    if (!formData.email.trim()) newErrors.email = t('register.errors.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('register.errors.emailInvalid');
    
    if (!formData.phone.trim()) newErrors.phone = t('register.errors.phoneRequired');
    else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) newErrors.phone = t('register.errors.phoneInvalid');
    
    if (!formData.businessName.trim()) newErrors.businessName = t('register.errors.businessNameRequired');
    if (!formData.businessType) newErrors.businessType = t('register.errors.businessTypeRequired');
    
    if (!formData.password) newErrors.password = t('register.errors.passwordRequired');
    else if (formData.password.length < 6) newErrors.password = t('register.errors.passwordLength');
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('register.errors.passwordMismatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            businessName: formData.businessName,
            businessType: formData.businessType,
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          toast({
            title: t('register.errors.accountExists'),
            description: t('register.errors.accountExistsDesc'),
            variant: "destructive",
          });
        } else {
          toast({
            title: t('register.errors.registrationFailed'),
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user) {
        toast({
          title: t('register.success.title'),
          description: t('register.success.description'),
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('register.errors.tryAgain'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex gap-4">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
      
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Marketing Content */}
        <div className="hidden lg:block animate-fade-in">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/lovable-uploads/a5d86a0b-8e34-4e06-85a5-6de4043457b9.png" 
                alt="Bizkash Logo" 
                className="h-24 w-auto"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {t('register.welcome')} <span className="text-kenya-red">Bizkash</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('register.subtitle')}
            </p>
            
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex items-center space-x-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">{t('register.features.trackIncomeExpenses')}</span>
              </div>
              <div className="flex items-center space-x-3 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">{t('register.features.generateInvoices')}</span>
              </div>
              <div className="flex items-center space-x-3 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">{t('register.features.businessInsights')}</span>
              </div>
              <div className="flex items-center space-x-3 animate-slide-up" style={{ animationDelay: '0.8s' }}>
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">{t('register.features.multiLanguage')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <Card className="w-full animate-slide-in-right">
          <CardHeader className="text-center">
            <div className="lg:hidden flex justify-center mb-4">
              <img 
                src="/lovable-uploads/a5d86a0b-8e34-4e06-85a5-6de4043457b9.png" 
                alt="Bizkash Logo" 
                className="h-16 w-auto"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{t('register.createAccount')}</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">{t('register.joinEntrepreneurs')}</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">{t('register.firstName')}</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={errors.firstName ? 'border-red-500' : ''}
                    placeholder={t('register.placeholders.firstName')}
                    disabled={loading}
                  />
                  {errors.firstName && <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <Label htmlFor="lastName">{t('register.lastName')}</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={errors.lastName ? 'border-red-500' : ''}
                    placeholder={t('register.placeholders.lastName')}
                    disabled={loading}
                  />
                  {errors.lastName && <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <Label htmlFor="email">{t('register.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder={t('register.placeholders.email')}
                  disabled={loading}
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone">{t('register.phone')}</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={errors.phone ? 'border-red-500' : ''}
                  placeholder={t('register.placeholders.phone')}
                  disabled={loading}
                />
                {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
              </div>

              {/* Business Information */}
              <div>
                <Label htmlFor="businessName">{t('register.businessName')}</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className={errors.businessName ? 'border-red-500' : ''}
                  placeholder={t('register.placeholders.businessName')}
                  disabled={loading}
                />
                {errors.businessName && <p className="text-sm text-red-600 mt-1">{errors.businessName}</p>}
              </div>

              <div>
                <Label htmlFor="businessType">{t('register.businessType')}</Label>
                <select
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md text-sm ${errors.businessType ? 'border-red-500' : 'border-gray-300'}`}
                  disabled={loading}
                >
                  <option value="">{t('register.placeholders.businessType')}</option>
                  {businessTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.businessType && <p className="text-sm text-red-600 mt-1">{errors.businessType}</p>}
              </div>

              {/* Password Fields */}
              <div>
                <Label htmlFor="password">{t('register.password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={errors.password ? 'border-red-500' : ''}
                    placeholder={t('register.placeholders.password')}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
              </div>

              <div>
                <Label htmlFor="confirmPassword">{t('register.confirmPassword')}</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                    placeholder={t('register.placeholders.confirmPassword')}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    disabled={loading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-kenya-red hover:bg-kenya-red/90 text-white"
                disabled={loading}
              >
                {loading ? t('register.creating') : t('register.createAccount')}
                {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('register.alreadyHaveAccount')}{' '}
                  <Link to="/login" className="text-kenya-blue hover:underline font-medium">
                    {t('register.signInHere')}
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
