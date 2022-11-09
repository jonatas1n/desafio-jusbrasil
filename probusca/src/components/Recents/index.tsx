import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { AiFillClockCircle } from "react-icons/ai";
import { useSearch } from "../../hooks/search";
import Title from '../Title'

export default function Recents() {
    const { recents } = useSearch();

    return (
        <Flex
            direction='column'
            paddingInline='2rem'
            gap='1.5rem'
        >
            <Title icon={AiFillClockCircle} title='Buscas recentes'/>
            <Stack>
                { recents.map( ({title, code, link}) => (
                    <Box
                        borderRadius='.25rem'
                        backgroundColor='pallete.recentCard'
                        padding='1.5rem'
                        key={title}
                    >
                        <Text fontStyle='h3'>{title}</Text>
                        <Text fontStyle='overline'>{code}</Text>
                    </Box>
                )) }
            </Stack>
        </Flex>
    )
}