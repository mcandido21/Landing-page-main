import { useEffect } from 'react';

export default function useReveal() {
    useEffect(() => {
        const elements = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) {
            elements.forEach((element) => element.classList.add('active'));
            return undefined;
        }

        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        elements.forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }, []);
}
