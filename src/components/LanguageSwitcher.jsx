import { LANGS } from '../i18n/translations.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function LanguageSwitcher({ floating = false }) {
    const { language, setLanguage, t } = useLanguage();

    return (
        <div
            className={`lang-switcher${floating ? ' lang-switcher--floating' : ''}`}
            role="group"
            aria-label={t('lang.group')}
        >
            {Object.entries(LANGS).map(([code, details]) => (
                <button
                    key={code}
                    type="button"
                    className={`lang-btn${language === code ? ' active' : ''}`}
                    lang={details.htmlLang}
                    title={details.name}
                    aria-label={details.name}
                    aria-pressed={language === code}
                    onClick={() => setLanguage(code)}
                >
                    {details.label}
                </button>
            ))}
        </div>
    );
}
