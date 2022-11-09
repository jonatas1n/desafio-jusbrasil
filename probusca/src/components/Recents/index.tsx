import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { FaClock } from "react-icons/fa";
import { useSearch } from "../../hooks/search";
import Title from '../Title'
import Card from "../Card";

export default function Recents() {
    const { recents } = useSearch();

    return (
        <Flex
            direction='column'
            padding='2rem'
            mt='1.5rem'
            gap='1.5rem'
            background='#dfdfdf'
            borderRadius='.25rem'
        >
            <Title icon={FaClock} title='Acessos recentes'/>
            <Stack>
                { recents.map( ({title, code, link}) => (
                    <Card
                        recent
                        key={title}
                    >
                        <Text fontStyle='h3'>{title}</Text>
                        <Text fontStyle='overline'>{code}</Text>
                    </Card>
                )) }
            </Stack>
        </Flex>
    )
}