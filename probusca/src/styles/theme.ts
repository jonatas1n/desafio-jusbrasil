import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    colors: {
        pallete: {
            "text": "#494949",
            "background": "#ECECEC",
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
    }
})