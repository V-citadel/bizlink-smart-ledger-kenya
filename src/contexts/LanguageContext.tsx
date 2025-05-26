
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
    'dashboard.title': 'Biz Link',
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
    'dashboard.title': 'Biz Link',
    'dashboard.subtitle': 'Biashara Smart Tracker',
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
    const savedLanguage = localStorage.getItem('biz-link-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'sw')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('biz-link-language', lang);
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
