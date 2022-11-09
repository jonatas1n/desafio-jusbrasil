import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    colors: {
        pallete: {
            "text": "#494949",
            "background": "#ECECEC",
            "darkGray": "#8D8D8D",
            "recentCard": "#F3F3F3",
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
            fontSize: '1.25rem',
            fontWeight: 600,
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
        small: {
            fontSize: '.825rem',
            fontWeight: 700,
            textTransform: 'uppercase'
        },
    }
})