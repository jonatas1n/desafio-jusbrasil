import { Flex } from "@chakra-ui/react";

interface ContainerProps {
    children: any;
    wide?: boolean;
}

export default function Container({children, wide=false} : ContainerProps) {
    return (
        <Flex maxW={'93rem'} w={wide ? '80%': '60%'} marginInline="auto">
            {children}
        </Flex>
    )
}