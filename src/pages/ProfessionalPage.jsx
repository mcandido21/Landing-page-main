import { Link } from 'react-router-dom';
import skillsImage from '../assets/images/skills.jpeg';
import Navbar from '../components/Navbar.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

const technologies = [
    ['devicon-html5-plain colored', 'HTML5'],
    ['devicon-css3-plain colored', 'CSS3'],
    ['devicon-javascript-plain colored', 'JavaScript'],
    ['devicon-sass-original colored', 'SASS'],
    ['devicon-tailwindcss-plain colored', 'Tailwind'],
    ['devicon-nodejs-plain colored', 'Node.js'],
    ['devicon-react-original colored', 'React JS'],
    ['devicon-mysql-plain colored', 'MySQL'],
    ['devicon-go-original-wordmark colored', 'Golang']
];

export default function ProfessionalPage() {
    const { t } = useLanguage();

    return (
        <>
            <Navbar internal />
            <main className="details-container">
                <img src={skillsImage} alt="Mário Cândido em contexto profissional" className="details-img" />
                <div className="details-info">
                    <h2>{t('details.prof.title')}</h2>
                    <p>
                        {t('details.prof.p1.before')}{' '}
                        <strong>{t('details.prof.p1.highlight')}</strong>
                        {t('details.prof.p1.after')}
                    </p>
                    <p>{t('details.prof.p2')}</p>

                    <section className="tech-stack-section">
                        <h3>{t('details.prof.stack.title')}</h3>
                        <p>{t('details.prof.stack.text')}</p>
                        <div className="tech-grid">
                            {technologies.map(([icon, name]) => (
                                <div className="tech-item" key={name}>
                                    <i className={icon} aria-hidden="true" />
                                    <p>{name}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <Link to="/" className="btn">{t('details.prof.btn')}</Link>
                </div>
            </main>
        </>
    );
}
