import { Flex, SimpleGrid, Image, Box, Stack, Text } from "@chakra-ui/react";
import Container from "../components/Container";
import logo from '../assets/img/logo.svg'
import { FaArrowLeft } from "react-icons/fa";
import DataCard from "../components/DataCard";

export default function Process() {
    return (
        <Container wide>
            <Flex>
                <Flex
                    direction='column'
                    className="about"
                    flex={3}
                    w='100%'
                >
                    <Image
                        src={logo.src}
                        w='200px'
                        paddingBlock='25px'
                        alt="Probusca"
                    />
                    <Flex
                        alignItems='center'
                        gap='1rem'
                    >
                        <FaArrowLeft size='1.25rem'/>
                        Voltar para buscar
                    </Flex>
                    <Box
                        backgroundColor='white'
                        padding='2rem'
                    >
                        <DataCard />
                    </Box>
                </Flex>
            </Flex>
        </Container>
    )
}