import { Image, Flex } from "@chakra-ui/react";
import Container from "../components/Container";
import logo from "../assets/img/logo.svg"
import RecentCards from "../components/RecentCards";
import SearchInput from "../components/SearchInput";
import Results from "../components/Results";
import { useSearch } from "../hooks/search";

const recents = [
  {
    title: 'Jerri Adriane Rodrigues Costa x Eletrofacil - Comercio de Eletrodomésticos LTDA - EPP',
    code: '3938007-10.2012.8.06.0167',
    link: '/'
  },
  {
    title: 'Jerri Adriane Rodrigues Costa x Eletrofacil - Comercio de Eletrodomésticos LTDA - EPP',
    code: '3938007-10.2012.8.06.0167',
    link: '/'
  },
  {
    title: 'Jerri Adriane Rodrigues Costa x Eletrofacil - Comercio de Eletrodomésticos LTDA - EPP',
    code: '3938007-10.2012.8.06.0167',
    link: '/'
  },
  {
    title: 'Jerri Adriane Rodrigues Costa x Eletrofacil - Comercio de Eletrodomésticos LTDA - EPP',
    code: '3938007-10.2012.8.06.0167',
    link: '/'
  },
]

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
          onClick={handleShowResults}
        />
        <SearchInput />
        {showResults
          ? <Results resultsList={recents} />
          : <RecentCards cardList={recents} />
        }
      </Flex>
    </Container>
  )
}
