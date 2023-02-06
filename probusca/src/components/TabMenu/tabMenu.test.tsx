import React, {useState} from 'react';
import TabMenu from ".";
import { render, fireEvent } from '@testing-library/react';

describe('TabMenu component', () => {
    let state = "Sobre"
    const setState = () => {
        state = state == "Sobre" ? "Participantes" : "Sobre"
    }
    it('renders the component', () => {
        const { getByText } = render(
            <TabMenu
                state={state}
                setState={setState}
            />
        );

        const participantesEl = getByText("Participantes");
        const sobreEl = getByText("Sobre");

        fireEvent.click(participantesEl);

        expect(participantesEl.style.fontWeight == "700");
        expect(sobreEl.style.fontWeight == '400');
        
        fireEvent.click(sobreEl);

        expect(participantesEl.style.fontWeight == "400");
        expect(sobreEl.style.fontWeight == '700');
    });
});

