import { Flex, Button, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSearch } from '../../hooks/search';
import { SearchFilterTypes } from '../../shared/interfaces/Search.interface'

interface FilteredProps {
    keyFilter : SearchFilterTypes;
    value: string;
}

enum replaceLabels {
    "court" = "Tribunal",
    "judgeClass" = "Classe Judicial",
    "judgeBody" = "Órgão Julgador",
    "jurisdiction" = "Comarca",
    "state" = "Estado",
};

export default function Filtered({keyFilter, value}: FilteredProps) {
    const { removeFilter } = useSearch();
    const handleRemoveFilter = useCallback(() => {
        removeFilter(keyFilter);
    }, [keyFilter, removeFilter])

    return (
        <Button onClick={handleRemoveFilter} background='black'>
            <Flex gap='.5rem' alignItems='center'>
                <FaTimes color='#D8D8D8'/>
                <Flex direction='column' alignItems='flex-start'>
                    <Text color='#DDD' textStyle='small'>{replaceLabels[keyFilter]}:</Text>
                    <Text color='white'>{value}</Text>
                </Flex>
            </Flex>
        </Button>
    );
}