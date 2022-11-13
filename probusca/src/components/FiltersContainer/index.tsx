import { Text, Flex } from "@chakra-ui/react";
import FilterSelect from "./FilterSelect";

export default function FiltersContainer() {
    return (
        <Flex
            gap='.5rem'
            alignItems='center'
            justifyItems='flex-start'
            flexWrap='wrap'
        >
            <Text textStyle='small' whiteSpace='nowrap'>filtrar por:</Text>
            <FilterSelect title='Tribunal' filterKey='court' />
            <FilterSelect title='Classe Judicial' filterKey='judgeClass' />
            <FilterSelect title='Vara' filterKey='judgeBody' />
            <FilterSelect title='Comarca' filterKey='jurisdiction' />
        </Flex> 
    )
}