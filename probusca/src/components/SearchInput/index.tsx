import { Box, Flex, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useSearch } from "../../hooks/search";
import { Input } from "../Input"
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Filtered from "../Filtered";
import FiltersContainer from "../FiltersContainer";
import { FaSearch } from "react-icons/fa";

export default function SearchInput() {
    const { handleSearch, filters, cleanResults } = useSearch();
    const {register, handleSubmit} = useForm();
    const router = useRouter();
    let search = router.query['search'];
    
    const handleSearchSubmit = useCallback( (values: any) => {
        let {search} = values;
        cleanResults();
        handleSearch(search);
    }, [cleanResults, handleSearch])

    if (search) handleSearchSubmit({search: search});

    return (
        <Box
            bgColor='white'
            p='2rem'
            borderRadius='.25rem'
            className="SearchInput"
            gap='1rem'
        >
            <form onSubmit={handleSubmit(handleSearchSubmit)}>
                <Flex
                    alignItems='center'
                    gap='1rem'
                    mb='1.5rem'
                >
                    <Input
                        type='text'
                        placeholder='Consultar processos'
                        onClick={handleSubmit(handleSearchSubmit)}
                        className='search__input'
                        {...register("search")}
                    />
                    <Box
                        _hover={{background: "#ddd", cursor: 'pointer'}}
                        p='.5rem'
                        onClick={handleSubmit(handleSearchSubmit)}
                        borderRadius='.5rem'
                        transform='scaleX(-1)'
                    >
                        <FaSearch className='search__btn' size='2rem'/>
                    </Box>
                </Flex>
                { !!filters && (
                    <Flex pb='1rem' flexWrap='wrap' gap='1rem'>
                        {filters.map( ({keyFilter, value}, index) => (
                            <Filtered key={index} keyFilter={keyFilter} value={value} />
                        ) )}
                    </Flex> 
                )}
                <FiltersContainer />
            </form>
        </Box>
    )
}