import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import LanguageSwitcher from '../components/LanguageSwitcher.jsx';
import '../css/success.css';

export default function SuccessPage() {
    const { t } = useLanguage();
    const [confirmation, followUp] = t('success.text').split('<br>');

    return (
        <main className="success-container">
            <LanguageSwitcher floating />
            <div className="success-card">
                <i className="fa-solid fa-circle-check" aria-hidden="true" />
                <h2>{t('success.title')}</h2>
                <p>{confirmation} {followUp}</p>
                <Link to="/" className="btn">{t('success.btn')}</Link>
            </div>
        </main>
    );
}
