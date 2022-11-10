import { useState } from "react";
import { Flex, Box, Stack, Text, Icon } from "@chakra-ui/react";
import TabMenu from "../TabMenu";
import ListData from "../ListData";
import Participants from "../Participants";
import { FaBell, FaBellSlash } from "react-icons/fa";

export default function DataCard() {
    const [selectedMenu, setSelectedMenu] = useState('Sobre');
    const [notificationOn, setNotificationOn] = useState(false);
    
    const handleMenu = (item: string) => setSelectedMenu(item)

    return (
        <Box
            backgroundColor='white'
            padding='2rem'
        >
            <Flex gap='1rem'>
                <Stack>
                    <Text textStyle='h4'>Jerri Adriane Rodrigues Costa x Eletrofacil - Comercio de Eletrodomésticos LTDA - EPP</Text>
                    <Text textStyle='overline'>3938007-10.2012.8.06.0167</Text>
                </Stack>
                <Icon w='1.5rem' h='1.5rem' as={notificationOn ? FaBell : FaBellSlash} />
            </Flex>
            <TabMenu
                state={selectedMenu}
                setState={handleMenu}
            />
            { selectedMenu == 'Sobre'
                ? <ListData />
                : <Participants /> 
            }
        </Box>
    )
}