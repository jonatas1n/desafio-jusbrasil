import { Flex,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    Input
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Button from '../Button'
import { getFiltersList } from '../../services/api'

interface FilterSelectProps {
    title: string;
    filterKey: string;
}

export default function FilterSelect({title, filterKey}:FilterSelectProps) {
    const [modalStatus, setModalStatus] = useState(false);
    const [options, setOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    const toggleModal = useCallback(() => {
        setModalStatus(!modalStatus);
    }, [modalStatus]);

    useEffect( () => {
        getFiltersList(filterKey)
            .then( data => setOptions(data) )
    }, [filterKey]);

    let searchedOptions = options?.filter((option:string) => {
        option = option.toLowerCase();
        return option.includes(searchTerm.toLowerCase())
    })

    return (
        <Flex>
            <Modal isOpen={modalStatus} onClose={toggleModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            name={'field-search-' + title}
                            type='text'
                            placeholder="Busca"
                            mb='1rem'
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <Flex
                            direction='column'
                            h='100%'
                            overflowY='auto'
                            pr='2rem'
                            maxHeight='60vh'
                        >
                            { options && searchedOptions
                                .map((option, index) => (
                                <Box
                                    key={index}
                                    borderBottom='2px solid black'
                                    _hover={{background: "#DDD", cursor: 'pointer'}}
                                    _last={{borderBottom: '0'}}
                                    p='.5rem'
                                >
                                    <Text>{option}</Text>
                                </Box>
                            )) }
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Button onClick={toggleModal}>
                <Text textStyle='h5'>{title.toUpperCase()}</Text>
            </Button>
        </Flex>
    )
}