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
                { results.map(({lawsuitID, court, jurisdiction, subject, date}, index) => (
                    <ResultItem
                        key={index}
                        subject={subject}
                        jurisdiction={jurisdiction}
                        lawsuitID={lawsuitID}
                        court={court}
                        date={date}
                    />
                )) }
            </Stack>
            <Text textAlign='center' textStyle='h2'>Sem mais resultados.</Text>
        </Flex>
    )
}