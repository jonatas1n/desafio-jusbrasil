import { Box, Flex, Stack, Text, Link } from "@chakra-ui/react";

interface RecentCardsProps {
    cardList: Array<{
        title: string;
        code: string;
        link: string;
    }>;
}

export default function RecentCards({cardList}: RecentCardsProps) {
    return (
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
    )
}