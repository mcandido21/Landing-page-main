import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export default function Navbar({ internal = false }) {
    const { t } = useLanguage();

    useEffect(() => {
        const updateScrollState = () => {
            document.querySelector('.nav')?.classList.toggle('scrolled', window.scrollY > 100);
        };

        updateScrollState();
        window.addEventListener('scroll', updateScrollState, { passive: true });
        return () => window.removeEventListener('scroll', updateScrollState);
    }, []);

    return (
        <nav className="nav">
            <div className="container">
                <h1 className="logo">
                    <Link to="/">Mário Cândido</Link>
                </h1>
                {internal ? (
                    <ul>
                        <li><Link to="/">{t('nav.back')}</Link></li>
                    </ul>
                ) : (
                    <ul>
                        <li><a href="#home">{t('nav.home')}</a></li>
                        <li><a href="#about">{t('nav.about')}</a></li>
                        <li><a href="#skills">{t('nav.skills')}</a></li>
                        <li><a href="#projects">{t('nav.projects')}</a></li>
                        <li><a href="#contact">{t('nav.contact')}</a></li>
                    </ul>
                )}
                <LanguageSwitcher />
            </div>
        </nav>
    );
}
