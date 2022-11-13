import { useState, useEffect, useCallback } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import TabMenu from "../TabMenu";
import ListData from "../ListData";
import Participants from "../Participants";
import { useRouter } from "next/router";
import { useProcess } from "../../hooks/process";
import BellButton from "../BellButton";
import ReactLoading from 'react-loading';

export default function DataCard() {
    const [selectedMenu, setSelectedMenu] = useState('Sobre');
    const router = useRouter();
    const { handleProcess, process } = useProcess();

    useEffect( () => {
        let processID = router.query['id'];
        if (!processID) return;
        handleProcess(processID.toString());
    }, [handleProcess, router.query])
    
    const handleMenu = useCallback((item: string) => setSelectedMenu(item), []);

    if (!process) {
        return (
            <Flex
                backgroundColor='white'
                padding='2rem'
                maxHeight='80vh'
                justifyContent='center'
                alignItems='center'
            >
                <ReactLoading />
            </Flex>
        )
    }

    return (
        <Box
            backgroundColor='white'
            padding='2rem'
            maxHeight='80vh'
        >
            <Flex direction='column' justifyContent='space-between' alignItems='flex-start' gap='1rem'>
                <Text textAlign='left' fontWeight={500} textStyle='h2'>Processo { process?.lawsuitID }</Text>
                <BellButton />
            </Flex>
            <TabMenu
                state={selectedMenu}
                setState={handleMenu}
            />
            <Flex h='70%' direction='column' overflowY='auto'>
                { selectedMenu == 'Sobre'
                    ? <ListData />
                    : <Participants /> 
                }
            </Flex>
        </Box>
    )
}