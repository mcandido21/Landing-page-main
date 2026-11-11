import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProfessionalPage from '../ProfessionalPage.jsx';
import { LanguageProvider } from '../../context/LanguageContext.jsx';

describe('página profissional', () => {
    it('renderiza o destaque profissional como elemento de texto seguro', () => {
        window.localStorage.clear();

        render(
            <MemoryRouter>
                <LanguageProvider>
                    <ProfessionalPage />
                </LanguageProvider>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: 'Português' }));

        expect(
            screen.getByText('Especialista Full Stack de TI na infraestrutura da Polícia Civil', {
                selector: 'strong'
            })
        ).toBeInTheDocument();
    });
});
