import { Link } from 'react-router-dom';
import aboutImage from '../assets/images/about.jpeg';
import Navbar from '../components/Navbar.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <>
            <Navbar internal />
            <main className="details-container">
                <img src={aboutImage} alt="Mário Cândido" className="details-img" />
                <div className="details-info">
                    <h2>{t('details.about.title')}</h2>
                    <p>{t('details.about.p1')}</p>
                    <p>{t('details.about.p2')}</p>
                    <p>{t('details.about.p3')}</p>
                    <Link to="/" className="btn">{t('details.about.btn')}</Link>
                </div>
            </main>
        </>
    );
}
