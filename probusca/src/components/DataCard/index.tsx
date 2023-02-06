import { useState, useEffect, useCallback } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import TabMenu from "../TabMenu";
import ListData from "../ListData";
import Participants from "../Participants";
import { useRouter } from "next/router";
import { useProcess } from "../../hooks/process";
import BellButton from "../BellButton";

export default function DataCard() {
    const [selectedMenu, setSelectedMenu] = useState('Sobre');
    const router = useRouter();
    const { handleProcess, process, showError } = useProcess();

    useEffect( () => {
        let processID = router.query['id'];
        if (!processID) return;
        handleProcess(processID.toString());
    }, [handleProcess, router.query])
    
    const handleMenu = useCallback((item: string) => setSelectedMenu(item), []);

    if (showError) {
        return (
            <Flex
                direction='column'
                background='white'
                padding='2rem'
                height={{sm:'unset', md:'unset', lg:'50vh'}}
                alignItems='center'
                justifyContent='center'
                gap='1rem'
                borderRadius='.25rem'
            >
                <Text textStyle='h2'>Parece que há algo errado...</Text>
                <Text textStyle='h5' textAlign='center'>Realize uma nova busca ou verifique o endereço e tente novamente.</Text>
            </Flex>
        )
    }

    return (
        <Box
            backgroundColor='white'
            padding='2rem'
            maxHeight={{ sm: 'unset', md: 'unset', lg:'80vh'}}
            className='data-card'
        >
            <Flex
                direction='column'
                justifyContent='space-between'
                alignItems='flex-start'
                gap='1rem'
            >
                <Text
                    textAlign='left'
                    fontWeight={500}
                    textStyle='h2'
                >
                        Processo { process?.lawsuitID }
                </Text>
                <BellButton />
            </Flex>
            <TabMenu
                state={selectedMenu}
                setState={handleMenu}
            />
            <Flex h={{sm: 'unset', md: 'unset', lg: '70%'}} direction='column' overflowY='auto'>
                { selectedMenu == 'Sobre'
                    ? <ListData />
                    : <Participants /> 
                }
            </Flex>
        </Box>
    )
}