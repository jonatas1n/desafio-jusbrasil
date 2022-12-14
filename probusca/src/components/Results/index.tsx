import Title from "../Title";
import { FaSearch } from "react-icons/fa";
import { Flex, Stack, Text } from "@chakra-ui/react";
import { useSearch } from "../../hooks/search";
import ResultItem from "./ResultItem";
import Button from "../Button";

export default function Results() {
    const { results, moreResults, showError } = useSearch();

    if(showError) {
        <Text textStyle='h2'>Sem resultados</Text>
    };

    return (
        <Flex
            direction='column'
            gap='1.5rem'
            mt='1.5rem'
            pb='2rem'
            className='results'
        >
            <Title icon={FaSearch} title='Resultados' />
            <Stack spacing='1rem' mb='1rem'>
                { results.map(({lawsuitID, court, jurisdiction, subject, date}) => (
                    <ResultItem
                        key={lawsuitID}
                        subject={subject}
                        jurisdiction={jurisdiction}
                        lawsuitID={lawsuitID}
                        court={court}
                        date={date}
                    />
                )) }
            </Stack>
            {showError ? (
                <Flex justifyContent='center'>
                    <Button onClick={moreResults}> Mais resultados </Button>
                </Flex>
            ) : (
                <Text textAlign='center' textStyle='h2'>Sem mais resultados.</Text>
            )}
        </Flex>
    )
}