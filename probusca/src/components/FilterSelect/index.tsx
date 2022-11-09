import { Flex, Select, Text } from "@chakra-ui/react";

interface FilterSelectProps {
    title?: string;
    options: Array<{
        label: string;
        value: string|number;
    }>;
}

export default function FilterSelect({options, title}:FilterSelectProps) {
    return (
        <Flex>
            <Select borderRadius='25' borderColor='pallete.text'>
                {title && (
                    <option>
                        <Text textStyle='h5'>{title.toUpperCase()}</Text>
                    </option>
                )}
                {options.map( ({label, value}) => (
                    <option key={value} value={value}>
                        <Text textStyle='h5'>{label}</Text>
                    </option>
                ) )}
            </Select>
        </Flex>
    )
}