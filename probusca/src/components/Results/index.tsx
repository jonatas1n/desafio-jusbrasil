import Title from "../Title";
import { AiOutlineSearch } from "react-icons/ai";
import { Flex, Stack, Text, Box } from "@chakra-ui/react";
import { useSearch } from "../../hooks/search";

export default function Results() {
    const { results } = useSearch();

    return (
        <Flex direction='column' gap='1.5rem'>
            <Title icon={AiOutlineSearch} title='Resultados' />
            <Stack spacing='1rem'>
                {results.map(({title, code, vara}, index) => (
                    <Box
                        key={index}
                        padding='2rem'
                        backgroundColor='white'
                        borderRadius='.25rem'
                    >
                        <Text textStyle='h3'>{title}</Text>
                        <Flex>
                            <Text textStyle='h4'>{code}</Text>
                            <Text textStyle='h4'>{vara}</Text>
                        </Flex>
                    </Box>
                ))}
            </Stack>
        </Flex>
    )
}