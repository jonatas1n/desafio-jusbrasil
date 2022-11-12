import { Flex, Text, useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { FaBell } from 'react-icons/fa';

export default function BellButton() {
    const [notificationOn, setNotificationOn] = useState(false);
    const toast = useToast();
    
    const handleBell = useCallback(() => {
        setNotificationOn(!notificationOn);
        if(!notificationOn) {
            toast({
                title: "Notificações Ativadas",
                description: "Você será notificado quando houver uma nova movimentação.",
                status: 'success',
                duration: 6000,
                isClosable: true
            });
        } else {
            toast({
                title: "Notificações Desativadas",
                description: "Você não será mais notificado com novas movimentações.",
                status: 'success',
                duration: 4000,
                isClosable: true
            });
        }
    }, [notificationOn, toast]);

    return (
        <Flex
            _hover={{background: "#ddd", cursor: 'pointer'}}
            borderRadius='5rem'
            justifyContent='flex-start'
            alignItems='center'
            gap='.5rem'
            w='fit-content'
            pl='.5rem'
            pr='.75rem'
            paddingBlock='.5rem'
            border='1px solid #d8d8d8'
            onClick={handleBell}
        >
            <FaBell size='1.5rem' color={notificationOn ? 'black' : '#d8d8d8'} />
            <Text fontSize= '.825rem' textStyle='h5'>Notificar</Text>
        </Flex>
    )
}