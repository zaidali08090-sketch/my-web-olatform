import React, { createContext, useState, useEffect } from 'react';

// Define a basic translation dictionary
const translations = {
    en: {
        welcome: 'Welcome',
        toggleLanguage: 'Toggle Language',
    },
    ar: {
        welcome: 'مرحبا',
        toggleLanguage: 'تبديل اللغة',
    },
};

// Create the Language Context
export const LanguageContext = createContext();

// Language Provider Component
export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    // Load language from localStorage
    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
    }, []);

    // Function to toggle language
    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'ar' : 'en';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    // Context value
    const value = {
        language,
        toggleLanguage,
        t: (key) => translations[language][key] || key,
    };

    return (
        <LanguageContext.Provider value={value}>
            <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
};

export default LanguageProvider;
