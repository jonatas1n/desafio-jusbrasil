import Title from "../Title";
import { FaSearch } from "react-icons/fa";
import { Flex, Stack, Text, Box } from "@chakra-ui/react";
import { useSearch } from "../../hooks/search";
import Card from "../Card";

export default function Results() {
    const { results } = useSearch();

    return (
        <Flex direction='column' gap='1.5rem' mt='1.5rem'>
            <Title icon={FaSearch} title='Resultados' />
            <Stack spacing='1rem'>
                {results.map(({title, code, vara}, index) => (
                    <Card key={index}>
                        <Text textStyle='h4'>{title}</Text>
                        <Flex
                            justifyContent='space-between'
                        >
                            <Text textStyle='overline'>{code}</Text>
                            <Text textStyle='h4'>{vara}</Text>
                        </Flex>
                    </Card>
                ))}
            </Stack>
        </Flex>
    )
}