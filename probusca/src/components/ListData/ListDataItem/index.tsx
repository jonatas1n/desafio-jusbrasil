import { Flex, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface ListDataItemProps {
    label: string;
    value: string|undefined;
    icon: IconType;
}

export default function ListDataItem({label, value, icon}: ListDataItemProps) {
    return (
        <Flex gap='1rem'>
            <Icon as={icon} color='black' mt='.25rem' />
            <Flex direction='column'>
                <Text textStyle='h4' fontSize='1rem'>{label}</Text>
                <Text>{value}</Text>
            </Flex>
        </Flex>
    )
}