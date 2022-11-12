import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme'
import { SearchProvider } from '../hooks/search';
import { ProcessProvider } from '../hooks/process';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchProvider>
      <ProcessProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ProcessProvider>
    </SearchProvider>
  )
}
