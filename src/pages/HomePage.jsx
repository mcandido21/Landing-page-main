import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext.jsx';
import Navbar from '../components/Navbar.jsx';
import useReveal from '../hooks/useReveal.js';

const skills = [
    { icon: 'fa-brands fa-html5', name: 'HTML5' },
    { icon: 'fa-brands fa-css3-alt', name: 'CSS3' },
    { icon: 'fa-brands fa-js', name: 'JavaScript' },
    { icon: 'fa-brands fa-react', name: 'React' }
];

const projects = ['1', '2', '3'];

function Hero() {
    const { t } = useLanguage();

    return (
        <section className="hero" id="home">
            <div className="container">
                <h1>{t('hero.title')}</h1>
                <p>{t('hero.text')}</p>
                <a href="#contact" className="btn">{t('hero.cta')}</a>
            </div>
        </section>
    );
}

function About() {
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <section className="content" id="about">
            <div className="container">
                <h2>{t('about.title')}</h2>
                <p>{t('about.text')}</p>
                <button className="btn-more" type="button" onClick={() => navigate('/about')}>
                    {t('about.more')}
                </button>

                <h3 className="career-heading">{t('about.bg.title')}</h3>
                <p>{t('about.bg.text')}</p>
                <button className="btn-more" type="button" onClick={() => navigate('/professional')}>
                    {t('about.bg.more')}
                </button>
            </div>
        </section>
    );
}

function Skills() {
    const { t } = useLanguage();

    return (
        <section className="skills" id="skills">
            <div className="container">
                <h2>{t('skills.title')}</h2>
                <div className="skills-grid">
                    {skills.map((skill) => (
                        <div className="skill-card reveal" key={skill.name}>
                            <i className={skill.icon} aria-hidden="true" />
                            <h3>{skill.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Projects() {
    const { t } = useLanguage();

    return (
        <section className="projects" id="projects">
            <div className="container">
                <h2>{t('projects.title')}</h2>
                <div className="projects-grid">
                    {projects.map((project) => (
                        <article className="project-card reveal" key={project}>
                            <h3>{t(`projects.${project}.title`)}</h3>
                            <p>{t(`projects.${project}.text`)}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Contact() {
    const { t } = useLanguage();
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        navigate('/success');
    }

    return (
        <section className="contact-section" id="contact">
            <div className="container">
                <h2>{t('contact.title')}</h2>
                <form onSubmit={handleSubmit}>
                    <label className="sr-only" htmlFor="name">{t('contact.name.label')}</label>
                    <input id="name" name="name" type="text" placeholder={t('contact.name.ph')} required />

                    <label className="sr-only" htmlFor="email">{t('contact.email.label')}</label>
                    <input id="email" name="email" type="email" placeholder={t('contact.email.ph')} required />

                    <label className="sr-only" htmlFor="phone">{t('contact.phone.label')}</label>
                    <input id="phone" name="phone" type="tel" placeholder={t('contact.phone.ph')} required />

                    <label className="sr-only" htmlFor="message">{t('contact.message.label')}</label>
                    <textarea id="message" name="message" rows="8" placeholder={t('contact.message.ph')} required />

                    <input type="submit" value={t('contact.submit')} />
                </form>

                <div className="social-links">
                    <a
                        href="https://www.linkedin.com/in/m%C3%A1rio-c%C3%A2ndido/?locale=en-US"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <i className="fa-brands fa-linkedin" aria-hidden="true" />
                    </a>
                    <a
                        href="https://github.com/mcandido21"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <i className="fa-brands fa-github" aria-hidden="true" />
                    </a>
                    <a
                        href="https://wa.me/5521971027243"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                    >
                        <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </section>
    );
}

export default function HomePage() {
    useReveal();

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </main>
        </>
    );
}
