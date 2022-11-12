import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    colors: {
        pallete: {
            "text": "#494949",
            "background": "#ECECEC",
            "darkGray": "#8D8D8D",
            "recentCard": "#F3F3F3",
            "blue": "#388dc8",
            'green': "#d5e1c9",
            'yellow': "#FECC16"
        }
    },
    fonts: {
        heading: 'Roboto',
        body: 'Roboto',
    },
    styles: {
        global: {
            body: {
                bg: 'pallete.background',
                color: 'pallete.text'
            }
        }
    },
    textStyles: {
        h2: {
            fontSize: '1.5rem',
            fontWeight: 300
        },
        h3: {
            fontSize: '1.25rem',
            fontWeight: 300,
        },
        h4: {
            fontSize: '1.125rem',
            fontWeight: 600,
            lineHeight: '23.44px'
        },
        h5: {
            fontSize: '1rem',
            fontWeight: 500,
        },
        overline: {
            fontSize: '14px',
            fontWeight: 400,
            letterSpacing: '.1rem',
            textTransform: 'uppercase'
        },
        regular: {
            fontSize: '1rem',
            fontWeight: 400
        },
        small: {
            fontSize: '.825rem',
            fontWeight: 700,
            textTransform: 'uppercase'
        },
    },
    breakpoints: {
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
        '2xl': '96em',
    }
})