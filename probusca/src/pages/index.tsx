import { Box, Image, Stack, Flex, Text } from "@chakra-ui/react";
import Container from "../components/Container";
import {Input} from "../components/Input";
import logo from "../assets/img/logo.svg"
import FilterSelect from "../components/FilterSelect";
import { AiFillClockCircle } from "react-icons/ai";
import Title from "../components/Title";
import RecentCards from "../components/RecentCards";

const comarcaOptions = [
  {
    value: 'sobral',
    label: 'Sobral'
  },
  {
    value: 'fortaleza',
    label: 'Fortaleza'
  }
];

const tribunalOptions = [
  {
    value: 'sobral',
    label: 'Sobral'
  },
  {
    value: 'fortaleza',
    label: 'Fortaleza'
  }
];

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
  return (
    <Container>
      <Flex
        direction='column'
        w='100%'
      >
        <Image
          src={logo.src}
          boxSize='200px'
          alt="Probusca"
        />
        <Box
          bgColor='white'
          p='2rem'
          mb='1.5rem'
          borderRadius='.25rem'
          className="Jonatas"
          gap='1rem'
        >
          <Input
            name='search'
            type='text'
            placeholder='Consultar processos'
            mb='1.5rem'
          />
          <Flex
            gap='1rem'
            alignItems='center'
            justifyItems='flex-start'
          >
            <Text textStyle='small' whiteSpace='nowrap'>filtrar por</Text>
            <FilterSelect title='Comarca' options={comarcaOptions} />
            <FilterSelect title='Tribunal' options={tribunalOptions} />
          </Flex>
        </Box>
        <Flex
          direction='column'
          paddingInline='2rem'
        >
          <Title icon={AiFillClockCircle} title='Buscas recentes'/>
          <Flex direction='column' gap='.5rem' mt='1.5rem'>
            <RecentCards cardList={recents} />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}
