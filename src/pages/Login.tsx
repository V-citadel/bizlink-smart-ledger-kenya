
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: 'demo@bizkash.com',
    password: 'demo123456'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-fill demo credentials on component mount
  useEffect(() => {
    setFormData({
      email: 'demo@bizkash.com',
      password: 'demo123456'
    });
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) newErrors.email = t('login.errors.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('login.errors.emailInvalid');
    
    if (!formData.password) newErrors.password = t('login.errors.passwordRequired');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    
    try {
      // Create a mock successful login for demo purposes
      toast({
        title: t('login.success.welcomeBack'),
        description: t('login.success.loggedIn'),
      });
      
      // Simulate authentication delay
      setTimeout(() => {
        navigate('/');
      }, 1000);
      
    } catch (error) {
      console.error('Demo login error:', error);
      toast({
        title: t('common.error'),
        description: t('login.errors.tryAgain'),
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Always use demo login for now
    await handleDemoLogin();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleQuickLogin = () => {
    setFormData({
      email: 'demo@bizkash.com',
      password: 'demo123456'
    });
    handleDemoLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 flex gap-3">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
      
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/a5d86a0b-8e34-4e06-85a5-6de4043457b9.png" 
                alt="Bizkash Logo" 
                className="h-20 w-auto"
              />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              {t('login.welcomeBack')}
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {t('login.signInAccount')}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Alert className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950">
              <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <AlertDescription className="text-emerald-800 dark:text-emerald-200">
                Ready to explore Bizkash! Use the pre-filled credentials or click "Quick Access" below.
              </AlertDescription>
            </Alert>

            <Button 
              onClick={handleQuickLogin}
              className="w-full h-12 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Accessing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <span>Quick Access</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-300 dark:border-slate-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-800 px-2 text-slate-500 dark:text-slate-400">
                  Or use the form
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t('login.email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`h-12 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-blue-500'} transition-colors`}
                  placeholder={t('login.placeholders.email')}
                  disabled={loading}
                />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t('login.password')}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`h-12 pr-12 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-slate-300 focus:border-blue-500'} transition-colors`}
                    placeholder={t('login.placeholders.password')}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">{t('login.rememberMe')}</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
                  {t('login.forgotPassword')}
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{t('login.signingIn')}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>{t('login.signIn')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>

              <div className="text-center pt-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {t('login.noAccount')}{' '}
                  <Link to="/register" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
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
