import React from 'react';
import BellButton from ".";
import { render, fireEvent } from '@testing-library/react';
import { ToastProvider } from '@chakra-ui/react';

describe('BellButton component', () => {
    it('renders the component', () => {
        const { getByText } = render(
            <ToastProvider>
                <BellButton />
            </ToastProvider>
        );

        const bellButton = getByText('Notificar');
        expect(bellButton).toBeInTheDocument();
    });

    it('handles the bell click', () => {
        const { getByText } = render(
            <ToastProvider>
                <BellButton />
            </ToastProvider>
        );

        const bellButton = getByText('Notificar');

        fireEvent.click(bellButton);
        
        expect(getByText('Notificações Ativadas')).toBeInTheDocument();
        expect(getByText('Você será notificado quando houver uma nova movimentação.')).toBeInTheDocument();
        
        expect(bellButton).toBeInTheDocument();
        expect(bellButton.querySelector('svg')?.style.color == "#000000");

        fireEvent.click(bellButton);

        expect(getByText('Notificações Desativadas')).toBeInTheDocument();
        expect(getByText('Você não será mais notificado com novas movimentações.')).toBeInTheDocument();

        expect(bellButton.querySelector('svg')?.style.color == "#d8d8d8");
    });
});

