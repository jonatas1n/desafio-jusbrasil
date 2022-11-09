import { Box, Flex, Stack, Text, Link } from "@chakra-ui/react";
import { AiFillClockCircle } from "react-icons/ai";
import Title from '../Title'

interface RecentCardsProps {
    cardList: Array<{
        title: string;
        code: string;
        link: string;
    }>;
}

export default function RecentCards({cardList}: RecentCardsProps) {
    return (
        <Flex
            direction='column'
            paddingInline='2rem'
            gap='1.5rem'
        >
            <Title icon={AiFillClockCircle} title='Buscas recentes'/>
            <Stack>
                { cardList.map( ({title, code, link}) => (
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