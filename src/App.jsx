import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useLanguage } from './context/LanguageContext.jsx';
import AboutPage from './pages/AboutPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProfessionalPage from './pages/ProfessionalPage.jsx';
import SuccessPage from './pages/SuccessPage.jsx';

const titleKeys = {
    '/': 'meta.index.title',
    '/about': 'meta.about.title',
    '/professional': 'meta.professional.title',
    '/success': 'meta.success.title'
};

export default function App() {
    const location = useLocation();
    const { t } = useLanguage();

    useEffect(() => {
        document.title = t(titleKeys[location.pathname] || 'meta.index.title');
        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.content = t('meta.index.desc');
        }
    }, [location.pathname, t]);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/professional" element={<ProfessionalPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
