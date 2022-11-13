import {
    FormControl,
    Icon,
    InputLeftElement,
    FormLabel,
    InputGroupProps,
    InputGroup,
    Input as ChakraInput,
    FormErrorMessage,
    InputRightElement,
} from "@chakra-ui/react";

import {
    forwardRef,
    useCallback,
    ForwardRefRenderFunction,
    useState,
} from "react";

import { FaSearch } from "react-icons/fa";
import { FieldError } from "react-hook-form";

interface InputProps extends InputGroupProps {
    name: string;
    label?: string;
    placeholder: string;
    type: string;
    error?: FieldError;
    hasValue?: boolean;
    value?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
    name,
    label,
    error = null,
    placeholder,
    type,
    hasValue,
    value,
    ...rest
}, ref ) => {
    const [iconColor, setIconColor] = useState("pallete.secondary");
    const [textValue, setTextValue] = useState(value);

    const handleChange = useCallback((event: any) => {
        setTextValue(event.target.value);
    }, []);

    return (
        <FormControl
            isInvalid={!!error}
        >
        {!!label && (
            <FormLabel marginBottom="0.1rem" htmlFor={name}>
            {label}
            </FormLabel>
        )}

        <InputGroup
            display="flex"
            alignItems="center"
            justifyContent="center"
            {...rest}
            >
            <ChakraInput
            name={name}
            id={name}
            ref={ref}
            type={type}
            onFocus={() => setIconColor("pallete.primary")}
            onBlur={() =>
                !textValue
                ? setIconColor("pallete.secondary")
                : setIconColor("pallete.primary")
            }
            focusBorderColor="pallete.primary"
            bgColor="pallete.background"
            borderColor={iconColor}
            variant="filled"
            onChange={handleChange}
            placeholder={placeholder}
            padding='1.875rem'
            backgroundColor='white'
            fontSize='1.5rem'
            _placeholder={{ color: "gray.400", fontWeight: 300, fontSize: '1.5rem' }}
            _hover={{
                bgColor: "pallete.sidebarBackground",
            }}
            _focus={{
                bgColor: "pallete.sidebarBackground",
            }}
            size="lg"
            />
            <InputRightElement
                top='.75rem'
                right='1rem'
                pointerEvents="none"
            >
                <FaSearch fontSize='1.5rem' color={iconColor} />
            </InputRightElement>
        </InputGroup>
        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    );
};

export const Input = forwardRef(InputBase);
