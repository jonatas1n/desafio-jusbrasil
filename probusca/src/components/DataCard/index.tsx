import { useState } from "react";
import { Flex, Box, Stack, Text } from "@chakra-ui/react";
import TabMenu from "../TabMenu";
import ListData from "../ListData";


export default function DataCard() {
    const [selectedMenu, setSelectedMenu] = useState('Sobre');
    
    const handleMenu = (item: string) => setSelectedMenu(item)

    return (
        <Flex direction='column'>
            <Stack>
                <Text textStyle='h4'>Jerri Adriane Rodrigues Costa x Eletrofacil - Comercio de Eletrodomésticos LTDA - EPP</Text>
                <Text textStyle='overline'>3938007-10.2012.8.06.0167</Text>
            </Stack>
            <TabMenu
                state={selectedMenu}
                setState={handleMenu}
            />
            { selectedMenu == 'Sobre' ? (
                <ListData />
            ) : null}
        </Flex>
    )
}