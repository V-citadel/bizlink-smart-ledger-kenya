
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
    'nav.reports': 'Reports',
    'nav.invoices': 'Invoices',
    'nav.help': 'Help',
    'nav.security': 'Security',

    // Common
    'common.error': 'Error',
    'common.success': 'Success',
    'common.loading': 'Loading...',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome back!',
    'dashboard.totalRevenue': 'Total Revenue',
    'dashboard.totalExpenses': 'Total Expenses',
    'dashboard.netProfit': 'Net Profit',
    'dashboard.transactions': 'Recent Transactions',
    'dashboard.viewAll': 'View All',
    'dashboard.addTransaction': 'Add Transaction',
    'dashboard.logout': 'Logout',
    'dashboard.income': 'Income',
    'dashboard.expenses': 'Expenses',
    'dashboard.profit': 'Profit',
    'dashboard.youHaveProfit': 'You have profit',
    'dashboard.youHaveLoss': 'You have loss',
    'dashboard.recentTransactions': 'Recent Transactions',
    'dashboard.noTransactions': 'No transactions yet',
    'dashboard.startAdding': 'Start by adding your first transaction',
    'dashboard.businessTools': 'Business Tools',
    'dashboard.voice': 'Voice',
    'dashboard.photo': 'Photo',
    'dashboard.manual': 'Manual',

    // Login
    'login.welcomeBack': 'Welcome Back',
    'login.signInAccount': 'Sign in to your account',
    'login.email': 'Email Address',
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
    'login.errors.tryAgain': 'Please try again',
    'login.success.welcomeBack': 'Welcome back!',
    'login.success.loggedIn': 'You have been logged in successfully',

    // Register
    'register.welcome': 'Welcome to',
    'register.subtitle': 'Manage your business finances with ease',
    'register.createAccount': 'Create Account',
    'register.joinEntrepreneurs': 'Join thousands of entrepreneurs',
    'register.firstName': 'First Name',
    'register.lastName': 'Last Name',
    'register.email': 'Email Address',
    'register.phone': 'Phone Number',
    'register.businessName': 'Business Name',
    'register.businessType': 'Business Type',
    'register.password': 'Password',
    'register.confirmPassword': 'Confirm Password',
    'register.creating': 'Creating account...',
    'register.alreadyHaveAccount': 'Already have an account?',
    'register.signInHere': 'Sign in here',
    'register.placeholders.firstName': 'Enter your first name',
    'register.placeholders.lastName': 'Enter your last name',
    'register.placeholders.email': 'Enter your email address',
    'register.placeholders.phone': 'Enter your phone number',
    'register.placeholders.businessName': 'Enter your business name',
    'register.placeholders.businessType': 'Select business type',
    'register.placeholders.password': 'Create a password',
    'register.placeholders.confirmPassword': 'Confirm your password',
    'register.businessTypes.generalStore': 'General Store',
    'register.businessTypes.restaurant': 'Restaurant',
    'register.businessTypes.electronics': 'Electronics',
    'register.businessTypes.fashion': 'Fashion',
    'register.businessTypes.agriculture': 'Agriculture',
    'register.businessTypes.services': 'Services',
    'register.businessTypes.other': 'Other',
    'register.errors.firstNameRequired': 'First name is required',
    'register.errors.lastNameRequired': 'Last name is required',
    'register.errors.emailRequired': 'Email is required',
    'register.errors.emailInvalid': 'Please enter a valid email',
    'register.errors.phoneRequired': 'Phone number is required',
    'register.errors.phoneInvalid': 'Please enter a valid phone number',
    'register.errors.businessNameRequired': 'Business name is required',
    'register.errors.businessTypeRequired': 'Business type is required',
    'register.errors.passwordRequired': 'Password is required',
    'register.errors.passwordLength': 'Password must be at least 6 characters',
    'register.errors.passwordMismatch': 'Passwords do not match',
    'register.errors.accountExists': 'Account already exists',
    'register.errors.accountExistsDesc': 'Please try logging in instead',
    'register.errors.registrationFailed': 'Registration failed',
    'register.errors.tryAgain': 'Please try again',
    'register.success.title': 'Account created successfully!',
    'register.success.description': 'Welcome to Bizkash',
    'register.features.trackIncomeExpenses': 'Track income and expenses easily',
    'register.features.generateInvoices': 'Generate professional invoices',
    'register.features.businessInsights': 'Get detailed business insights',
    'register.features.multiLanguage': 'Multi-language support'
  },
  sw: {
    // Navigation
    'nav.dashboard': 'Dashibodi',
    'nav.reports': 'Ripoti',
    'nav.invoices': 'Ankara',
    'nav.help': 'Msaada',
    'nav.security': 'Usalama',

    // Common
    'common.error': 'Kosa',
    'common.success': 'Mafanikio',
    'common.loading': 'Inapakia...',
    'common.cancel': 'Ghairi',
    'common.save': 'Hifadhi',
    'common.delete': 'Futa',
    'common.edit': 'Hariri',

    // Dashboard
    'dashboard.title': 'Dashibodi',
    'dashboard.welcome': 'Karibu tena!',
    'dashboard.totalRevenue': 'Mapato Yote',
    'dashboard.totalExpenses': 'Matumizi Yote',
    'dashboard.netProfit': 'Faida Halisi',
    'dashboard.transactions': 'Miamala ya Hivi Karibuni',
    'dashboard.viewAll': 'Ona Zote',
    'dashboard.addTransaction': 'Ongeza Muamala',
    'dashboard.logout': 'Toka',
    'dashboard.income': 'Mapato',
    'dashboard.expenses': 'Matumizi',
    'dashboard.profit': 'Faida',
    'dashboard.youHaveProfit': 'Una faida',
    'dashboard.youHaveLoss': 'Una hasara',
    'dashboard.recentTransactions': 'Miamala ya Hivi Karibuni',
    'dashboard.noTransactions': 'Hakuna miamala bado',
    'dashboard.startAdding': 'Anza kwa kuongeza muamala wako wa kwanza',
    'dashboard.businessTools': 'Zana za Biashara',
    'dashboard.voice': 'Sauti',
    'dashboard.photo': 'Picha',
    'dashboard.manual': 'Kwa Mkono',

    // Login
    'login.welcomeBack': 'Karibu Tena',
    'login.signInAccount': 'Ingia kwenye akaunti yako',
    'login.email': 'Barua Pepe',
    'login.password': 'Nywila',
    'login.rememberMe': 'Nikumbuke',
    'login.forgotPassword': 'Umesahau nywila?',
    'login.signIn': 'Ingia',
    'login.signingIn': 'Inaingia...',
    'login.noAccount': 'Huna akaunti?',
    'login.createOne': 'Tengeneza moja',
    'login.placeholders.email': 'Ingiza barua pepe yako',
    'login.placeholders.password': 'Ingiza nywila yako',
    'login.errors.emailRequired': 'Barua pepe inahitajika',
    'login.errors.emailInvalid': 'Tafadhali ingiza barua pepe sahihi',
    'login.errors.passwordRequired': 'Nywila inahitajika',
    'login.errors.tryAgain': 'Tafadhali jaribu tena',
    'login.success.welcomeBack': 'Karibu tena!',
    'login.success.loggedIn': 'Umeingia kwa mafanikio',

    // Register
    'register.welcome': 'Karibu',
    'register.subtitle': 'Simamia fedha za biashara yako kwa urahisi',
    'register.createAccount': 'Tengeneza Akaunti',
    'register.joinEntrepreneurs': 'Jiunge na maelfu ya wafanyabiashara',
    'register.firstName': 'Jina la Kwanza',
    'register.lastName': 'Jina la Ukoo',
    'register.email': 'Barua Pepe',
    'register.phone': 'Nambari ya Simu',
    'register.businessName': 'Jina la Biashara',
    'register.businessType': 'Aina ya Biashara',
    'register.password': 'Nywila',
    'register.confirmPassword': 'Thibitisha Nywila',
    'register.creating': 'Inaunda akaunti...',
    'register.alreadyHaveAccount': 'Una akaunti tayari?',
    'register.signInHere': 'Ingia hapa',
    'register.placeholders.firstName': 'Ingiza jina lako la kwanza',
    'register.placeholders.lastName': 'Ingiza jina lako la ukoo',
    'register.placeholders.email': 'Ingiza anwani ya barua pepe',
    'register.placeholders.phone': 'Ingiza nambari ya simu',
    'register.placeholders.businessName': 'Ingiza jina la biashara',
    'register.placeholders.businessType': 'Chagua aina ya biashara',
    'register.placeholders.password': 'Unda nywila',
    'register.placeholders.confirmPassword': 'Thibitisha nywila yako',
    'register.businessTypes.generalStore': 'Duka la Kawaida',
    'register.businessTypes.restaurant': 'Mkahawa',
    'register.businessTypes.electronics': 'Vifaa vya Kielektroniki',
    'register.businessTypes.fashion': 'Mitindo',
    'register.businessTypes.agriculture': 'Kilimo',
    'register.businessTypes.services': 'Huduma',
    'register.businessTypes.other': 'Nyingine',
    'register.errors.firstNameRequired': 'Jina la kwanza linahitajika',
    'register.errors.lastNameRequired': 'Jina la ukoo linahitajika',
    'register.errors.emailRequired': 'Barua pepe inahitajika',
    'register.errors.emailInvalid': 'Tafadhali ingiza barua pepe sahihi',
    'register.errors.phoneRequired': 'Nambari ya simu inahitajika',
    'register.errors.phoneInvalid': 'Tafadhali ingiza nambari sahihi ya simu',
    'register.errors.businessNameRequired': 'Jina la biashara linahitajika',
    'register.errors.businessTypeRequired': 'Aina ya biashara inahitajika',
    'register.errors.passwordRequired': 'Nywila inahitajika',
    'register.errors.passwordLength': 'Nywila lazima iwe na angalau herufi 6',
    'register.errors.passwordMismatch': 'Nywila hazifanani',
    'register.errors.accountExists': 'Akaunti tayari ipo',
    'register.errors.accountExistsDesc': 'Tafadhali jaribu kuingia badala yake',
    'register.errors.registrationFailed': 'Usajili umeshindwa',
    'register.errors.tryAgain': 'Tafadhali jaribu tena',
    'register.success.title': 'Akaunti imeundwa kwa mafanikio!',
    'register.success.description': 'Karibu Bizkash',
    'register.features.trackIncomeExpenses': 'Fuatilia mapato na matumizi kwa urahisi',
    'register.features.generateInvoices': 'Tengeneza ankara za kitaalamu',
    'register.features.businessInsights': 'Pata ufahamu wa kina wa biashara',
    'register.features.multiLanguage': 'Msaada wa lugha nyingi'
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

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('bizkash-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: changeLanguage,
      t
    }}>
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
