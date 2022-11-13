import { Flex, Stack, Text, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { ProcessParticipantProps } from '../../../shared/interfaces/Process.interface'

interface ParticipantGroupProps {
    title: string;
    list: Array<ProcessParticipantProps>;
    icon: IconType;
};

export default function ParticipantGroup({list, icon, title}:ParticipantGroupProps) {
    const orderShow = ['type', 'oab'];

    return (
        <Flex gap='1rem'>
            <Icon mt='.25rem' as={icon} />
            <Stack>
                <Text fontWeight={600} textStyle='h5'>{title}</Text>
                <Stack spacing={4}>
                    { list.map( (listItem, index) => (
                        <Flex
                            key={index}
                            direction='column'
                            paddingLeft='.5rem'
                        >
                            <Text textStyle='regular' textTransform='uppercase'>{listItem.name}</Text>
                            <Flex gap='.5rem'>
                                { Object.entries(listItem)
                                    .sort((a, b) => orderShow.indexOf(a[0]) - orderShow.indexOf(b[0]))
                                    .filter(item => item[1] && orderShow.includes(item[0]))
                                    .map( ([key, item]) => (
                                        <Text
                                            key={item}
                                            borderRight='1px solid black'
                                            pr='.5rem'
                                            _last={{borderRight: 'none', paddingRight: 0}}
                                            textStyle='h5'
                                            textTransform='capitalize'
                                        >
                                            {item == 'reu' ? 'réu': item}
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