import { Button as Btn } from "@chakra-ui/react";

interface ButtonProps {
    children: any;
    onClick?: () => void;
}

export default function Button({children, onClick}:ButtonProps) {
    return (
        <Btn
            p='.5rem'
            border='2px solid black'
            background='white'
            _hover={{background: '#D8D8D8', cursor: 'pointer'}}
            borderRadius='5rem'
            onClick={onClick}
        >
            {children}
        </Btn>
    )
}