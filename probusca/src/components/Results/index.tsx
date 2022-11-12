import Title from "../Title";
import { FaSearch } from "react-icons/fa";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { useSearch } from "../../hooks/search";
import ResultItem from "./ResultItem";

export default function Results() {
    const { results } = useSearch();

    if(results.length == 0) {
        return (
            <Text textAlign='center' p='3rem' textStyle='h2'>Sem resultados.</Text>
        )
    }

    return (
        <Flex
            direction='column'
            gap='1.5rem'
            mt='1.5rem'
            pb='2rem'
        >
            <Title icon={FaSearch} title='Resultados' />
            <Stack spacing='1rem' mb='1rem'>
                { results.map(({lawsuitID, jurisdiction, subject, date}) => (
                    <ResultItem
                        key={lawsuitID}
                        subject={subject}
                        lawsuitID={lawsuitID}
                        jurisdiction={jurisdiction}
                        date={date}
                    />
                )) }
            </Stack>
            <Text textAlign='center' textStyle='h2'>Sem mais resultados.</Text>
        </Flex>
    )
}