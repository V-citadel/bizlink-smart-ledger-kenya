
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.income': 'Income',
    'nav.expenses': 'Expenses',
    'nav.profit': 'Profit',
    'nav.reports': 'Reports',
    'nav.invoices': 'Invoices',
    'nav.security': 'Security',
    'nav.help': 'Help',
    
    // Dashboard
    'dashboard.title': 'Bizkash',
    'dashboard.subtitle': 'Smart Business Tracker',
    'dashboard.income': 'Income',
    'dashboard.expenses': 'Expenses',
    'dashboard.profit': 'Profit',
    'dashboard.addTransaction': 'Add Transaction',
    'dashboard.voice': 'Voice',
    'dashboard.photo': 'Photo',
    'dashboard.manual': 'Manual',
    'dashboard.businessTools': 'Business Tools',
    'dashboard.recentTransactions': 'Recent Transactions',
    'dashboard.noTransactions': 'No transactions yet',
    'dashboard.startAdding': 'Start adding your income and expenses',
    'dashboard.youHaveProfit': 'You have profit!',
    'dashboard.youHaveLoss': 'You have loss',
    
    // Register Page
    'register.welcome': 'Welcome to',
    'register.subtitle': 'Your smart business companion for tracking profits and growing your business in Kenya',
    'register.createAccount': 'Create Your Account',
    'register.joinEntrepreneurs': 'Join thousands of Kenyan entrepreneurs',
    'register.firstName': 'First Name',
    'register.lastName': 'Last Name',
    'register.email': 'Email Address',
    'register.phone': 'Phone Number',
    'register.businessName': 'Business Name',
    'register.businessType': 'Business Type',
    'register.password': 'Password',
    'register.confirmPassword': 'Confirm Password',
    'register.creating': 'Creating Account...',
    'register.alreadyHaveAccount': 'Already have an account?',
    'register.signInHere': 'Sign in here',
    
    'register.placeholders.firstName': 'Enter your first name',
    'register.placeholders.lastName': 'Enter your last name',
    'register.placeholders.email': 'your.email@example.com',
    'register.placeholders.phone': '+254 700 000 000',
    'register.placeholders.businessName': 'Enter your business name',
    'register.placeholders.businessType': 'Select your business type',
    'register.placeholders.password': 'Create a strong password',
    'register.placeholders.confirmPassword': 'Confirm your password',
    
    'register.businessTypes.generalStore': 'Duka (General Store)',
    'register.businessTypes.restaurant': 'Restaurant/Hotel',
    'register.businessTypes.electronics': 'Electronics',
    'register.businessTypes.fashion': 'Clothing/Fashion',
    'register.businessTypes.agriculture': 'Agriculture',
    'register.businessTypes.services': 'Services',
    'register.businessTypes.other': 'Other',
    
    'register.features.trackIncomeExpenses': 'Track income & expenses with voice or photos',
    'register.features.generateInvoices': 'Generate professional invoices',
    'register.features.businessInsights': 'Get business insights & reports',
    'register.features.multiLanguage': 'Multi-language support (English & Kiswahili)',
    
    'register.errors.firstNameRequired': 'First name is required',
    'register.errors.lastNameRequired': 'Last name is required',
    'register.errors.emailRequired': 'Email is required',
    'register.errors.emailInvalid': 'Email is invalid',
    'register.errors.phoneRequired': 'Phone number is required',
    'register.errors.phoneInvalid': 'Invalid phone number',
    'register.errors.businessNameRequired': 'Business name is required',
    'register.errors.businessTypeRequired': 'Please select business type',
    'register.errors.passwordRequired': 'Password is required',
    'register.errors.passwordLength': 'Password must be at least 6 characters',
    'register.errors.passwordMismatch': 'Passwords do not match',
    'register.errors.accountExists': 'Account already exists',
    'register.errors.accountExistsDesc': 'This email is already registered. Please try logging in instead.',
    'register.errors.registrationFailed': 'Registration failed',
    'register.errors.tryAgain': 'Please try again later.',
    
    'register.success.title': 'Registration successful!',
    'register.success.description': 'Welcome to Bizkash! You can now start tracking your business.',
    
    // Login Page
    'login.welcomeBack': 'Welcome Back',
    'login.signInAccount': 'Sign in to your Bizkash account',
    'login.email': 'Email Address',
    'login.password': 'Password',
    'login.rememberMe': 'Remember me',
    'login.forgotPassword': 'Forgot password?',
    'login.signIn': 'Sign In',
    'login.signingIn': 'Signing In...',
    'login.noAccount': "Don't have an account?",
    'login.createOne': 'Create one here',
    
    'login.placeholders.email': 'your.email@example.com',
    'login.placeholders.password': 'Enter your password',
    
    'login.errors.emailRequired': 'Email is required',
    'login.errors.emailInvalid': 'Email is invalid',
    'login.errors.passwordRequired': 'Password is required',
    'login.errors.loginFailed': 'Login failed',
    'login.errors.invalidCredentials': 'Invalid email or password. Please check your credentials and try again.',
    'login.errors.tryAgain': 'Please try again later.',
    
    'login.success.welcomeBack': 'Welcome back!',
    'login.success.loggedIn': 'You have successfully logged in to Bizkash.',
    
    // Common
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.update': 'Update',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
  },
  sw: {
    // Navigation
    'nav.dashboard': 'Dashibodi',
    'nav.income': 'Mapato',
    'nav.expenses': 'Matumizi',
    'nav.profit': 'Faida',
    'nav.reports': 'Ripoti',
    'nav.invoices': 'Bili',
    'nav.security': 'Usalama',
    'nav.help': 'Msaada',
    
    // Dashboard
    'dashboard.title': 'Bizkash',
    'dashboard.subtitle': 'Mfumo wa Biashara Akili',
    'dashboard.income': 'Mapato',
    'dashboard.expenses': 'Matumizi',
    'dashboard.profit': 'Faida',
    'dashboard.addTransaction': 'Ongeza Shughuli',
    'dashboard.voice': 'Sauti',
    'dashboard.photo': 'Picha',
    'dashboard.manual': 'Kawaida',
    'dashboard.businessTools': 'Zana za Biashara',
    'dashboard.recentTransactions': 'Shughuli za Hivi Karibuni',
    'dashboard.noTransactions': 'Hakuna shughuli bado',
    'dashboard.startAdding': 'Anza kuongeza mapato na matumizi yako',
    'dashboard.youHaveProfit': 'Una faida!',
    'dashboard.youHaveLoss': 'Una hasara',
    
    // Register Page
    'register.welcome': 'Karibu',
    'register.subtitle': 'Mshirika wako wa biashara akili wa kufuatilia faida na kukuza biashara yako Kenya',
    'register.createAccount': 'Tengeneza Akaunti Yako',
    'register.joinEntrepreneurs': 'Jiunge na maelfu ya wafanyabiashara wa Kenya',
    'register.firstName': 'Jina la Kwanza',
    'register.lastName': 'Jina la Mwisho',
    'register.email': 'Anwani ya Barua Pepe',
    'register.phone': 'Nambari ya Simu',
    'register.businessName': 'Jina la Biashara',
    'register.businessType': 'Aina ya Biashara',
    'register.password': 'Nenosiri',
    'register.confirmPassword': 'Thibitisha Nenosiri',
    'register.creating': 'Inaundwa Akaunti...',
    'register.alreadyHaveAccount': 'Tayari una akaunti?',
    'register.signInHere': 'Ingia hapa',
    
    'register.placeholders.firstName': 'Weka jina lako la kwanza',
    'register.placeholders.lastName': 'Weka jina lako la mwisho',
    'register.placeholders.email': 'barua.yako@mfano.com',
    'register.placeholders.phone': '+254 700 000 000',
    'register.placeholders.businessName': 'Weka jina la biashara yako',
    'register.placeholders.businessType': 'Chagua aina ya biashara yako',
    'register.placeholders.password': 'Tengeneza nenosiri kali',
    'register.placeholders.confirmPassword': 'Thibitisha nenosiri lako',
    
    'register.businessTypes.generalStore': 'Duka (Duka la Jumla)',
    'register.businessTypes.restaurant': 'Mgahawa/Hoteli',
    'register.businessTypes.electronics': 'Elektroniki',
    'register.businessTypes.fashion': 'Nguo/Mtindo',
    'register.businessTypes.agriculture': 'Kilimo',
    'register.businessTypes.services': 'Huduma',
    'register.businessTypes.other': 'Nyingine',
    
    'register.features.trackIncomeExpenses': 'Fuatilia mapato na matumizi kwa sauti au picha',
    'register.features.generateInvoices': 'Tengeneza bili za kitaalamu',
    'register.features.businessInsights': 'Pata maarifa na ripoti za biashara',
    'register.features.multiLanguage': 'Msaada wa lugha nyingi (Kiingereza na Kiswahili)',
    
    'register.errors.firstNameRequired': 'Jina la kwanza linahitajika',
    'register.errors.lastNameRequired': 'Jina la mwisho linahitajika',
    'register.errors.emailRequired': 'Barua pepe inahitajika',
    'register.errors.emailInvalid': 'Barua pepe si sahihi',
    'register.errors.phoneRequired': 'Nambari ya simu inahitajika',
    'register.errors.phoneInvalid': 'Nambari ya simu si sahihi',
    'register.errors.businessNameRequired': 'Jina la biashara linahitajika',
    'register.errors.businessTypeRequired': 'Tafadhali chagua aina ya biashara',
    'register.errors.passwordRequired': 'Nenosiri linahitajika',
    'register.errors.passwordLength': 'Nenosiri lazima liwe na urefu wa angalau herufi 6',
    'register.errors.passwordMismatch': 'Nenosiri hazifanani',
    'register.errors.accountExists': 'Akaunti tayari ipo',
    'register.errors.accountExistsDesc': 'Barua pepe hii tayari imesajiliwa. Tafadhali jaribu kuingia badala yake.',
    'register.errors.registrationFailed': 'Usajili umeshindwa',
    'register.errors.tryAgain': 'Tafadhali jaribu tena baadaye.',
    
    'register.success.title': 'Usajili umefanikiwa!',
    'register.success.description': 'Karibu Bizkash! Unaweza kuanza kufuatilia biashara yako sasa.',
    
    // Login Page
    'login.welcomeBack': 'Karibu Tena',
    'login.signInAccount': 'Ingia kwenye akaunti yako ya Bizkash',
    'login.email': 'Anwani ya Barua Pepe',
    'login.password': 'Nenosiri',
    'login.rememberMe': 'Nikumbuke',
    'login.forgotPassword': 'Umesahau nenosiri?',
    'login.signIn': 'Ingia',
    'login.signingIn': 'Inaingia...',
    'login.noAccount': 'Huna akaunti?',
    'login.createOne': 'Tengeneza hapa',
    
    'login.placeholders.email': 'barua.yako@mfano.com',
    'login.placeholders.password': 'Weka nenosiri lako',
    
    'login.errors.emailRequired': 'Barua pepe inahitajika',
    'login.errors.emailInvalid': 'Barua pepe si sahihi',
    'login.errors.passwordRequired': 'Nenosiri linahitajika',
    'login.errors.loginFailed': 'Kuingia kumeshindwa',
    'login.errors.invalidCredentials': 'Barua pepe au nenosiri si sahihi. Tafadhali kagua tena.',
    'login.errors.tryAgain': 'Tafadhali jaribu tena baadaye.',
    
    'login.success.welcomeBack': 'Karibu tena!',
    'login.success.loggedIn': 'Umeingia kwa mafanikio kwenye Bizkash.',
    
    // Common
    'common.close': 'Funga',
    'common.save': 'Hifadhi',
    'common.cancel': 'Ghairi',
    'common.delete': 'Futa',
    'common.edit': 'Hariri',
    'common.add': 'Ongeza',
    'common.update': 'Sasisha',
    'common.loading': 'Inapakia...',
    'common.error': 'Hitilafu',
    'common.success': 'Imefanikiwa',
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

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('bizkash-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
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
