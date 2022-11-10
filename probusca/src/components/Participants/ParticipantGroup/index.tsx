import { Flex, Stack, Text, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Company } from '../../../shared/interfaces/Company.interface';
import { Attorney, Person } from '../../../shared/interfaces/Person.interface';

interface ParticipantGroupProps {
    list: Array<Person|Attorney|Company>;
    icon: IconType;
};

export default function ParticipantGroup({list, icon}:ParticipantGroupProps) {
    const orderShow = ['type', 'oab', 'cpf', 'cnpj'];

    return (
        <Flex gap='1rem' mb='3rem'>
            <Icon mt='.25rem' as={icon} />
            <Stack>
                <Text fontWeight={600} textStyle='h5'>Polo ativo</Text>
                <Stack spacing={4}>
                    { list.map( listItem => (
                        <Flex key={listItem.title} direction='column' borderLeft='1px solid #ccc' paddingLeft='.5rem'>
                            <Text textStyle='regular' textTransform='uppercase'>{listItem.title}</Text>
                            <Flex gap='.5rem'>
                                { orderShow
                                    .filter(item => Object.keys(listItem).includes(item))
                                    .map( (item: any) => (
                                        <Text
                                            key={item}
                                            borderRight='1px solid black'
                                            pr='.5rem'
                                            _last={{borderRight: 'none', paddingRight: 0}}
                                            textStyle='h5'
                                        >
                                            {listItem[item]}
                                        </Text>
                                    )
                                )}
                            </Flex>
                        </Flex>
                    )) }
                </Stack>
            </Stack>
        </Flex>
    )
}