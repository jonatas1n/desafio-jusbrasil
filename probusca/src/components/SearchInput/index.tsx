import { Box, Flex, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useSearch } from "../../hooks/search";
import FilterSelect from "../FilterSelect"
import { Input } from "../Input"
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Filtered from "../Filtered";

export default function SearchInput() {
    const { handleSearch, filters } = useSearch();
    const {register, handleSubmit} = useForm();
    const router = useRouter();
    let search = router.query['search'];
    
    const handleSearchSubmit = useCallback( (values: any) => {
        let {search} = values;
        handleSearch(search);
    }, [handleSearch])

    if (search) handleSearchSubmit({search: search});

    return (
        <Box
            bgColor='white'
            p='2rem'
            borderRadius='.25rem'
            className="Jonatas"
            gap='1rem'
        >
            <form onSubmit={handleSubmit(handleSearchSubmit)}>
                <Input
                    type='text'
                    placeholder='Consultar processos'
                    mb='1.5rem'
                    {...register("search")}
                />
                { !!filters && (
                    <Flex pb='1rem' flexWrap='wrap' gap='1rem'>
                        {filters.map( ({keyFilter, value}, index) => (
                            <Filtered key={index} keyFilter={keyFilter} value={value} />
                        ) )}
                    </Flex> 
                )}
                <Flex
                    gap='1rem'
                    alignItems='center'
                    justifyItems='flex-start'
                >
                    <Text textStyle='small' whiteSpace='nowrap'>filtrar por</Text>
                    <FilterSelect title='Tribunal' filterKey='court' />
                    <FilterSelect title='Classe Judicial' filterKey='judgeClass' />
                    <FilterSelect title='Órgão Julgador' filterKey='judgeBody' />
                </Flex>
            </form>
        </Box>
    )
}