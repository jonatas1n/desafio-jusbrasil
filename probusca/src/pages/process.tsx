import { Flex, SimpleGrid, Image, Link } from "@chakra-ui/react";
import Container from "../components/Container";
import logo from '../assets/img/logo.svg'
import { FaArrowLeft } from "react-icons/fa";
import DataCard from "../components/DataCard";
import Movement from "../components/Movement";

export default function Process() {
    return (
        <Container wide>
            <SimpleGrid
                columns={{lg: 2, md: 1}}
                h='100vh'
                spacing='2rem'
                overflow='hidden'
            >
                <Flex
                    direction='column'
                    flex={3}
                    gap='1.5rem'
                >
                    <Image
                        src={logo.src}
                        w='200px'
                        paddingBlock='25px'
                        alt="Probusca"
                        mt='1rem'
                    />
                    <Flex
                        as={Link}
                        href='/'
                        alignItems='center'
                        gap='1rem'
                    >
                        <FaArrowLeft size='1.25rem'/>
                        Voltar para buscar
                    </Flex>
                    <DataCard />
                </Flex>
                <Flex
                    as={Movement}
                    w='unset'
                    flex={2}
                />
            </SimpleGrid>
        </Container>
    )
}