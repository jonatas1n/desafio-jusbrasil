import { Box } from "@chakra-ui/react";

interface ContainerProps {
    children: React.ReactNode;
    wide?: boolean;
    h?: string;
}

export default function Container({children, wide=false, h=''} : ContainerProps) {
    const width = wide ? {sm: '95%', md: '90%', lg: '80%'} : {sm: '95%', md: '80%', lg: '60%'};

    return (
        <Box
            h={h}
            maxW={'93rem'}
            w={width}
            marginInline="auto"
        >
            {children}
        </Box>
    )
}