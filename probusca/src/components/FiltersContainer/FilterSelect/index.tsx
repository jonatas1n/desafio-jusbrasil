import { Flex,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Input
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import Button from '../../Button'
import FilterSelectItem from './FilterSelectItem'
import { SearchFilterTypes } from '../../../shared/interfaces/Search.interface';
import { useSearch } from "../../../hooks/search";

interface FilterSelectProps {
    title: string;
    filterKey: SearchFilterTypes;
}

export default function FilterSelect({title, filterKey}:FilterSelectProps) {
    const { getFilterOptions, handleFilterOptions } = useSearch()
    const [modalStatus, setModalStatus] = useState(false);
    const [options, setOptions] = useState<string[]>(getFilterOptions(filterKey));
    const [searchTerm, setSearchTerm] = useState('');
    
    const toggleModal = useCallback(() => {
        setModalStatus(!modalStatus);
    }, [modalStatus]);

    useEffect( () => {
        setOptions(getFilterOptions(filterKey));
    }, [filterKey, getFilterOptions, handleFilterOptions]);

    let searchedOptions = options?.filter((option:string) => {
        option = option.toLowerCase();
        return option.includes(searchTerm.toLowerCase())
    })

    return (
        <Flex>
            <Modal isOpen={modalStatus} onClose={toggleModal}>
                <ModalOverlay />
                <ModalContent className='filter-select__modal'>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {options?.length ? (
                            <Input
                                name={'field-search-' + title}
                                type='text'
                                placeholder="Busca"
                                mb='1rem'
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        ) : (
                            <Text
                                textStyle='h5'
                                textAlign='center'
                                mb='2rem'
                            >
                                Erro ao coletar filtros
                            </Text>
                        )}
                        <Flex
                            direction='column'
                            h='100%'
                            overflowY='auto'
                            pr='2rem'
                            maxHeight='60vh'
                        >
                            { options && searchedOptions
                                .map((option, index) => (
                                    <FilterSelectItem
                                        key={index}
                                        closeModal={toggleModal}
                                        filterKey={filterKey}
                                        option={option}
                                    />
                                ))
                            }
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Button className='filter-select' onClick={toggleModal}>
                <Text textStyle='h5'>{title.toUpperCase()}</Text>
            </Button>
        </Flex>
    )
}