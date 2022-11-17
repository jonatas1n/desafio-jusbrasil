import { Button as Btn } from "@chakra-ui/react";

interface ButtonProps {
    children: React.ReactNode;
    background?: string;
    onClick?: () => void;
    className?: string;
}

export default function Button({children, onClick, background='white', className}:ButtonProps) {
    return (
        <Btn
            background={background}
            p='.75rem 1rem'
            border='2px solid black'
            _hover={{background: '#D8D8D8', cursor: 'pointer'}}
            borderRadius='5rem'
            onClick={onClick}
            className={className}
        >
            {children}
        </Btn>
    )
}