import { Image, Flex } from "@chakra-ui/react";
import Container from "../components/Container";
import logo from "../assets/img/logo.svg"
import RecentCards from "../components/Recents";
import SearchInput from "../components/SearchInput";
import Results from "../components/Results";
import { useSearch } from "../hooks/search";

export default function Home() {
  const { showResults, handleShowResults } = useSearch();

  return (
    <Container>
      <Flex
        direction='column'
        w='100%'
      >
        <Image
          src={logo.src}
          w='200px'
          paddingBlock={showResults ? '25px' : '75px'}
          alt="Probusca"
          marginInline={{md: 'auto', lg: 'unset'}}
          onClick={handleShowResults}
        />
        <SearchInput />
        {showResults
          ? <Results />
          : <RecentCards />
        }
      </Flex>
    </Container>
  )
}
