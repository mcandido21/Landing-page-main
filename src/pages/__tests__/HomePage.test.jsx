import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../HomePage.jsx';
import { LanguageProvider } from '../../context/LanguageContext.jsx';

function renderHomePage() {
    return render(
        <MemoryRouter>
            <LanguageProvider>
                <HomePage />
            </LanguageProvider>
        </MemoryRouter>
    );
}

describe('formulário de contato', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('informa que o formulário é demonstrativo e não afirma que enviou a mensagem', () => {
        renderHomePage();

        fireEvent.click(screen.getByRole('button', { name: 'Português' }));

        fireEvent.change(screen.getByLabelText('Seu nome'), {
            target: { value: 'Pessoa de teste' }
        });
        fireEvent.change(screen.getByLabelText('Seu e-mail'), {
            target: { value: 'teste@example.com' }
        });
        fireEvent.change(screen.getByLabelText('Telefone'), {
            target: { value: '21999999999' }
        });
        fireEvent.change(screen.getByLabelText('Deixe sua mensagem'), {
            target: { value: 'Mensagem de teste' }
        });
        fireEvent.submit(screen.getByRole('button', { name: 'Enviar' }).closest('form'));

        expect(screen.getByRole('status')).toHaveTextContent(
            'Este formulário é demonstrativo: sua mensagem não foi enviada.'
        );
        expect(screen.getByLabelText('Seu nome')).toBeInTheDocument();
    });
});
