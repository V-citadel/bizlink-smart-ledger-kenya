
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowRight, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { signUp } = useAuth();
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
      await signUp(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        businessName: formData.businessName,
        businessType: formData.businessType,
      });

      toast({
        title: t('register.success.title'),
        description: t('register.success.description'),
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: t('register.errors.registrationFailed'),
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="absolute top-4 right-4 flex gap-3">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {t('register.createAccount')}
              </CardTitle>
              <p className="text-slate-600 dark:text-slate-400">
                {t('register.joinEntrepreneurs')}
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      {t('register.firstName')}
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`mt-1 ${errors.firstName ? 'border-red-500' : ''}`}
                      placeholder={t('register.placeholders.firstName')}
                      disabled={loading}
                    />
                    {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      {t('register.lastName')}
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`mt-1 ${errors.lastName ? 'border-red-500' : ''}`}
                      placeholder={t('register.placeholders.lastName')}
                      disabled={loading}
                    />
                    {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t('register.email')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder={t('register.placeholders.email')}
                    disabled={loading}
                  />
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Label htmlFor="businessName" className="text-sm font-medium">
                    {t('register.businessName')}
                  </Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className={`mt-1 ${errors.businessName ? 'border-red-500' : ''}`}
                    placeholder={t('register.placeholders.businessName')}
                    disabled={loading}
                  />
                  {errors.businessName && <p className="text-xs text-red-600 mt-1">{errors.businessName}</p>}
                </div>

                <div>
                  <Label htmlFor="businessType" className="text-sm font-medium">
                    {t('register.businessType')}
                  </Label>
                  <select
                    id="businessType"
                    value={formData.businessType}
                    onChange={(e) => handleInputChange('businessType', e.target.value)}
                    className={`w-full mt-1 px-3 py-2 text-sm border rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white ${errors.businessType ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'}`}
                    disabled={loading}
                  >
                    <option value="">{t('register.placeholders.businessType')}</option>
                    {businessTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.businessType && <p className="text-xs text-red-600 mt-1">{errors.businessType}</p>}
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium">
                    {t('register.password')}
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`pr-10 ${errors.password ? 'border-red-500' : ''}`}
                      placeholder={t('register.placeholders.password')}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    {t('register.confirmPassword')}
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder={t('register.placeholders.confirmPassword')}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                      disabled={loading}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>}
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t('register.creating')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>{t('register.createAccount')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>

                <div className="text-center pt-3">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {t('register.alreadyHaveAccount')}{' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
                      {t('register.signInHere')}
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
