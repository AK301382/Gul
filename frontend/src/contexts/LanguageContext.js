import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fa'); // default to Dari
  const [direction, setDirection] = useState('rtl');

  useEffect(() => {
    // Update direction based on language
    if (language === 'en') {
      setDirection('ltr');
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    } else {
      setDirection('rtl');
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = language;
    }
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, direction, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};