import Title from "../Title";
import { AiOutlineSearch } from "react-icons/ai";
import { Flex, Stack, Text, Box } from "@chakra-ui/react";

interface ResultsProps {
    resultsList: Array<{
        title: string,
        code: string,
        vara?: string;
        link: string;
    }>;
}

export default function Results({resultsList}:ResultsProps) {
    return (
        <Flex direction='column' gap='1.5rem'>
            <Title icon={AiOutlineSearch} title='Resultados' />
            <Stack spacing='1rem'>
                {resultsList.map(({title, code, vara}) => (
                    <Box
                        key={title}
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