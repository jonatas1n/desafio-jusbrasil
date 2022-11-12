import { Box, Flex, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useSearch } from "../../hooks/search";
import FilterSelect from "../FilterSelect"
import { Input } from "../Input"
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function SearchInput() {
    const { handleSearch} = useSearch();
    const {register, handleSubmit} = useForm();
    const router = useRouter();
    let search = router.query['search'];
    
    const handleSearchSubmit = useCallback( (values: any) => {
        let {search} = values;
        handleSearch(search);
    }, [handleSearch])

    if (search)
        handleSearchSubmit({search: search});

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