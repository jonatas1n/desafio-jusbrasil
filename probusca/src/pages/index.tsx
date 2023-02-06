import { Image, Flex } from "@chakra-ui/react";
import Container from "../components/Container";
import logo from "../assets/img/logo.png"
import SearchInput from "../components/SearchInput";
import Results from "../components/Results";
import { useSearch } from "../hooks/search";
import Head from 'next/head'

export default function Home() {
  const { totalResults } = useSearch();
  const showResults = totalResults > 0;

  return (
    <Container>
      <Head>
        <title>Probusca</title>
      </Head>
      <Flex
        direction='column'
        justifyContent={showResults ? 'unset' : 'center'}
        h='100vh'
        w='100%'
      >
        <Image
          src={logo.src}
          w='200px'
          paddingBottom={showResults ? '1.5rem' : '4.5rem'}
          alt="Probusca"
          marginInline={{sm: 'auto', md: 'auto', lg: 'unset'}}
          marginTop={showResults ? '1.5rem' : '-8rem'}
        />
        <SearchInput />
        {showResults ? <Results /> : null}
      </Flex>
    </Container>
  )
}
