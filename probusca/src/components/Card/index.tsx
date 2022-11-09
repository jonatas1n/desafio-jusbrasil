import { Box } from "@chakra-ui/react";

interface CardProps {
    children: any;
    recent?: boolean
}

export default function Card({children, recent=false}:CardProps) {
    return (
        <Box
            borderRadius='.25rem'
            backgroundColor={recent ? 'pallete.recentCard' : 'white'}
            padding='1.5rem'
            boxShadow='0px 0px 4px rgba(0, 0, 0, 0.25);'
            _hover={{
                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25);',
                cursor: 'pointer',
            }}
        >
            {children}
        </Box>
    )
}