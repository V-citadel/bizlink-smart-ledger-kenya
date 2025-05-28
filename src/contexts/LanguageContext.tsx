import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common
    'common.error': 'Error',
    'common.success': 'Success',
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.close': 'Close',

    // Login
    'login.welcomeBack': 'Welcome Back',
    'login.signInAccount': 'Sign in to your account',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.rememberMe': 'Remember me',
    'login.forgotPassword': 'Forgot password?',
    'login.signIn': 'Sign In',
    'login.signingIn': 'Signing in...',
    'login.noAccount': "Don't have an account?",
    'login.createOne': 'Create one',
    'login.placeholders.email': 'Enter your email',
    'login.placeholders.password': 'Enter your password',
    'login.errors.emailRequired': 'Email is required',
    'login.errors.emailInvalid': 'Please enter a valid email',
    'login.errors.passwordRequired': 'Password is required',
    'login.errors.loginFailed': 'Login Failed',
    'login.errors.invalidCredentials': 'Invalid email or password',
    'login.errors.emailNotConfirmed': 'Email Not Confirmed',
    'login.errors.checkEmailConfirmation': 'Please check your email and confirm your account, or contact support',
    'login.errors.tryAgain': 'Please try again later',
    'login.success.welcomeBack': 'Welcome back!',
    'login.success.loggedIn': 'You have been successfully logged in',

    // Register
    'register.createAccount': 'Create Account',
    'register.joinBizkash': 'Join Bizkash today',
    'register.firstName': 'First Name',
    'register.lastName': 'Last Name',
    'register.phone': 'Phone Number',
    'register.businessName': 'Business Name',
    'register.businessType': 'Business Type',
    'register.email': 'Email',
    'register.password': 'Password',
    'register.confirmPassword': 'Confirm Password',
    'register.agreeTerms': 'I agree to the Terms of Service and Privacy Policy',
    'register.creating': 'Creating account...',
    'register.haveAccount': 'Already have an account?',
    'register.signInHere': 'Sign in here',

    // Business Types
    'businessTypes.retail': 'Retail',
    'businessTypes.restaurant': 'Restaurant',
    'businessTypes.service': 'Service',
    'businessTypes.wholesale': 'Wholesale',
    'businessTypes.other': 'Other',

    // Dashboard
    'dashboard.welcome': 'Welcome to Bizkash',
    'dashboard.overview': 'Business Overview',
    'dashboard.totalRevenue': 'Total Revenue',
    'dashboard.totalExpenses': 'Total Expenses',
    'dashboard.netProfit': 'Net Profit',
    'dashboard.transactions': 'Recent Transactions',
    'dashboard.addTransaction': 'Add Transaction',
    'dashboard.viewAll': 'View All',
    'dashboard.logout': 'Logout',
  },
  sw: {
    // Common
    'common.error': 'Hitilafu',
    'common.success': 'Mafanikio',
    'common.loading': 'Inapakia...',
    'common.save': 'Hifadhi',
    'common.cancel': 'Ghairi',
    'common.delete': 'Futa',
    'common.edit': 'Hariri',
    'common.view': 'Tazama',
    'common.close': 'Funga',

    // Login
    'login.welcomeBack': 'Karibu Tena',
    'login.signInAccount': 'Ingia kwenye akaunti yako',
    'login.email': 'Barua Pepe',
    'login.password': 'Nenosiri',
    'login.rememberMe': 'Nikumbuke',
    'login.forgotPassword': 'Umesahau nenosiri?',
    'login.signIn': 'Ingia',
    'login.signingIn': 'Inaingia...',
    'login.noAccount': 'Huna akaunti?',
    'login.createOne': 'Tengeneza moja',
    'login.placeholders.email': 'Ingiza barua pepe yako',
    'login.placeholders.password': 'Ingiza nenosiri lako',
    'login.errors.emailRequired': 'Barua pepe inahitajika',
    'login.errors.emailInvalid': 'Tafadhali ingiza barua pepe halali',
    'login.errors.passwordRequired': 'Nenosiri linahitajika',
    'login.errors.loginFailed': 'Kuingia Kumeshindwa',
    'login.errors.invalidCredentials': 'Barua pepe au nenosiri sio sahihi',
    'login.errors.emailNotConfirmed': 'Barua Pepe Haijathibitishwa',
    'login.errors.checkEmailConfirmation': 'Tafadhali angalia barua pepe yako na uthibitishe akaunti yako, au wasiliana na msaada',
    'login.errors.tryAgain': 'Tafadhali jaribu tena baadaye',
    'login.success.welcomeBack': 'Karibu tena!',
    'login.success.loggedIn': 'Umeingia kwa mafanikio',

    // Register
    'register.createAccount': 'Tengeneza Akaunti',
    'register.joinBizkash': 'Jiunge na Bizkash leo',
    'register.firstName': 'Jina la Kwanza',
    'register.lastName': 'Jina la Mwisho',
    'register.phone': 'Nambari ya Simu',
    'register.businessName': 'Jina la Biashara',
    'register.businessType': 'Aina ya Biashara',
    'register.email': 'Barua Pepe',
    'register.password': 'Nenosiri',
    'register.confirmPassword': 'Thibitisha Nenosiri',
    'register.agreeTerms': 'Ninakubali Masharti ya Huduma na Sera ya Faragha',
    'register.creating': 'Inatengeneza akaunti...',
    'register.haveAccount': 'Tayari una akaunti?',
    'register.signInHere': 'Ingia hapa',

    // Business Types
    'businessTypes.retail': 'Rejareja',
    'businessTypes.restaurant': 'Mkahawa',
    'businessTypes.service': 'Huduma',
    'businessTypes.wholesale': 'Jumla',
    'businessTypes.other': 'Nyingine',

    // Dashboard
    'dashboard.welcome': 'Karibu kwenye Bizkash',
    'dashboard.overview': 'Muhtasari wa Biashara',
    'dashboard.totalRevenue': 'Mapato Yote',
    'dashboard.totalExpenses': 'Gharama Zote',
    'dashboard.netProfit': 'Faida Halisi',
    'dashboard.transactions': 'Miamala ya Hivi Karibuni',
    'dashboard.addTransaction': 'Ongeza Muamala',
    'dashboard.viewAll': 'Tazama Yote',
    'dashboard.logout': 'Toka',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('bizkash-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'sw')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bizkash-language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
