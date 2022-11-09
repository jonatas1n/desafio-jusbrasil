import { Flex, Text, Icon } from "@chakra-ui/react"
import { IconType } from "react-icons";

interface TitleProps {
    title: string;
    icon?: IconType;
    position?: 'left'|'right';
}

export default function Title({position='left', icon, title}: TitleProps) {
    return (
        <Flex
            gap='.75rem'
            alignItems='center'
        >
            {position == 'left' && <Icon as={icon} h='1.5rem' w='1.5rem'/>}
            <Text textStyle='h3'>{title}</Text>
            {position == 'right' && <Icon as={icon} h='1.5rem' w='1.5rem'/>}
        </Flex>
    )
}