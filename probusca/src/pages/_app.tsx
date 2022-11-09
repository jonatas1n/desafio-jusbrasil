import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme'
import { SearchProvider } from '../hooks/search';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SearchProvider>
  )
}
