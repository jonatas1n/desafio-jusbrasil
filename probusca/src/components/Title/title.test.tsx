import React from 'react';
import Title from ".";
import { render } from '@testing-library/react';

describe('Title component', () => {
    const titleText = "SomeTitle"
    it('renders the component', () => {
        const { getByText } = render(
            <Title title={titleText}/>
        );

        expect(getByText(titleText)).toBeInTheDocument();
    });
});

