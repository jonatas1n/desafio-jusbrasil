import { Box, Link } from "@chakra-ui/react";

interface CardProps {
    children: React.ReactNode;
    recent?: boolean;
    link?: string;
    className?: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export default function Card({children, recent=false, link, onMouseEnter, onMouseLeave, className}:CardProps) {
    return (
        <Box
            as={!!link ? Link : Box}
            href={link}
            borderRadius='.25rem'
            backgroundColor={recent ? 'pallete.recentCard' : 'white'}
            padding='1.5rem'
            boxShadow='0px 0px 4px rgba(0, 0, 0, 0.25);'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={className}
            _hover={{
                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25);',
                cursor: 'pointer',
            }}
        >
            {children}
        </Box>
    )
}