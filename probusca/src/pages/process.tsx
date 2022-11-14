import { Flex, SimpleGrid, Image, Link } from "@chakra-ui/react";
import Container from "../components/Container";
import logo from '../assets/img/logo.png'
import { FaArrowLeft } from "react-icons/fa";
import DataCard from "../components/DataCard";
import Movement from "../components/Movement";
import { useProcess } from "../hooks/process";

export default function Process() {
    return (
        <Container wide>
            <SimpleGrid
                columns={{lg: 2, md: 1}}
                h='100vh'
                spacing='1rem'
                overflow={{lg: 'hidden', md: 'hidden', sm: 'auto'}}
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
                    flex={2}
                />
            </SimpleGrid>
        </Container>
    )
}