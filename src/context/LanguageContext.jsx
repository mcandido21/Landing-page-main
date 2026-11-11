import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LANGS, translations } from '../i18n/translations.js';

const LanguageContext = createContext(null);

function getInitialLanguage() {
    try {
        const savedLanguage = window.localStorage.getItem('portfolio-lang');
        if (savedLanguage && LANGS[savedLanguage]) {
            return savedLanguage;
        }
    } catch {
        // Language selection still works when browser storage is unavailable.
    }

    const candidates = navigator.languages?.length
        ? navigator.languages
        : [navigator.language || 'pt'];

    return candidates
        .map((candidate) => candidate.toLowerCase().slice(0, 2))
        .find((candidate) => LANGS[candidate]) || 'pt';
}

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState(getInitialLanguage);

    const t = useCallback((key) => (
        translations[language][key] ?? translations.pt[key] ?? key
    ), [language]);

    useEffect(() => {
        document.documentElement.lang = LANGS[language].htmlLang;
        try {
            window.localStorage.setItem('portfolio-lang', language);
        } catch {
            // The selected language remains available for the current session.
        }
    }, [language]);

    const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage deve ser usado dentro de LanguageProvider.');
    }
    return context;
}
