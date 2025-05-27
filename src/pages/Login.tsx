
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) newErrors.email = t('login.errors.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('login.errors.emailInvalid');
    
    if (!formData.password) newErrors.password = t('login.errors.passwordRequired');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: t('login.errors.loginFailed'),
            description: t('login.errors.invalidCredentials'),
            variant: "destructive",
          });
        } else {
          toast({
            title: t('login.errors.loginFailed'),
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (data.user) {
        toast({
          title: t('login.success.welcomeBack'),
          description: t('login.success.loggedIn'),
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('login.errors.tryAgain'),
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
      
      <div className="w-full max-w-md">
        <Card className="animate-bounce-in">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <img 
                src="/lovable-uploads/a5d86a0b-8e34-4e06-85a5-6de4043457b9.png" 
                alt="Bizkash Logo" 
                className="h-16 w-auto"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{t('login.welcomeBack')}</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">{t('login.signInAccount')}</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">{t('login.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder={t('login.placeholders.email')}
                  disabled={loading}
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password">{t('login.password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={errors.password ? 'border-red-500' : ''}
                    placeholder={t('login.placeholders.password')}
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

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('login.rememberMe')}</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-kenya-blue hover:underline">
                  {t('login.forgotPassword')}
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-kenya-red hover:bg-kenya-red/90 text-white"
                disabled={loading}
              >
                {loading ? t('login.signingIn') : t('login.signIn')}
                {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t('login.noAccount')}{' '}
                  <Link to="/register" className="text-kenya-blue hover:underline font-medium">
                    {t('login.createOne')}
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

export default Login;
