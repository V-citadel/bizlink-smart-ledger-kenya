
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Languages className="w-4 h-4 text-gray-600" />
      <div className="flex space-x-1">
        <Button
          variant={language === 'en' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLanguage('en')}
          className="h-8 px-3 text-xs"
        >
          EN
        </Button>
        <Button
          variant={language === 'sw' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setLanguage('sw')}
          className="h-8 px-3 text-xs"
        >
          SW
        </Button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
