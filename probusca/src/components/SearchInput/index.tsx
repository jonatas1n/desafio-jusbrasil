import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useSearch } from "../../hooks/search";
import FilterSelect from "../FilterSelect"
import { Input } from "../Input"

const comarcaOptions = [
    {
        value: 'sobral',
        label: 'Sobral'
    },
    {
        value: 'fortaleza',
        label: 'Fortaleza'
    }
];

const tribunalOptions = [
    {
        value: 'sobral',
        label: 'Sobral'
    },
    {
        value: 'fortaleza',
        label: 'Fortaleza'
    }
];

export default function SearchInput() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getFilterOptions } = useSearch();
    const [ filterOptions, setFilterOptions ] = useState([]);

    const handleFilterOpen = useCallback( (filterKey: string) => {
        let options = getFilterOptions(filterKey);
        setFilterOptions(options);
        onOpen();
    }, [getFilterOptions, onOpen])

    return (
        <Box
            bgColor='white'
            p='2rem'
            borderRadius='.25rem'
            className="Jonatas"
            gap='1rem'
        >
            <Input
                name='search'
                type='text'
                placeholder='Consultar processos'
                mb='1.5rem'
            />
            <Flex
                gap='1rem'
                alignItems='center'
                justifyItems='flex-start'
            >
                <Text textStyle='small' whiteSpace='nowrap'>filtrar por</Text>
                <FilterSelect title='Comarca' options={comarcaOptions} />
                <FilterSelect title='Tribunal' options={tribunalOptions} />
            </Flex>
        </Box>
    )
}