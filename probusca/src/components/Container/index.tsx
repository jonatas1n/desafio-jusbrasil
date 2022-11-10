import { Box } from "@chakra-ui/react";

interface ContainerProps {
    children: any;
    wide?: boolean;
}

export default function Container({children, wide=false} : ContainerProps) {
    const width = wide ? {sm: '95%', md: '90%', lg: '80%'} : {sm: '95%', md: '80%', lg: '60%'};

    return (
        <Box maxW={'93rem'} w={width} marginInline="auto">
            {children}
        </Box>
    )
}