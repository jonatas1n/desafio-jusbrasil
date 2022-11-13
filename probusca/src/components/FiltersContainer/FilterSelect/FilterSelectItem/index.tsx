import { Box, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useSearch } from '../../../../hooks/search'
import { SearchFilterTypes } from '../../../../shared/interfaces/Search.interface'

interface FilterSelectItemProps {
    filterKey: SearchFilterTypes;
    option: string;
    closeModal: () => void;
}

export default function FilterSelectItem({filterKey, option, closeModal}:FilterSelectItemProps) {
    const { addFilter } = useSearch();
    const handleAddFilter = useCallback(() => {
        addFilter(filterKey, option);
        closeModal();
    }, [addFilter, closeModal, filterKey, option]);

    return (
        <Box
            onClick={handleAddFilter}
            borderBottom='2px solid black'
            _hover={{background: "#DDD", cursor: 'pointer'}}
            _last={{borderBottom: '0'}}
            p='.5rem'
        >
            <Text>{option}</Text>
        </Box>
    )
}