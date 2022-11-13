import { Image, Flex } from "@chakra-ui/react";
import Container from "../components/Container";
import logo from "../assets/img/logo.png"
import SearchInput from "../components/SearchInput";
import Results from "../components/Results";
import { useSearch } from "../hooks/search";

export default function Home() {
  const { results } = useSearch();

  return (
    <Container>
      <Flex
        direction='column'
        justifyContent={results.length ? 'unset' : 'center'}
        h='100vh'
        w='100%'
      >
        <Image
          src={logo.src}
          w='200px'
          paddingBottom={results.length ? '1.5rem' : '4.5rem'}
          alt="Probusca"
          marginInline={{sm: 'auto', md: 'auto', lg: 'unset'}}
          marginTop={results.length ? '1.5rem' : '-8rem'}
        />
        <SearchInput />
        {results.length ? <Results /> : null}
      </Flex>
    </Container>
  )
}
