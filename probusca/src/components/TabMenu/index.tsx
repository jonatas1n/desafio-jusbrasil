import { Flex, Icon, Text } from "@chakra-ui/react";
import { AiOutlineInfoCircle, AiFillInfoCircle } from "react-icons/ai"
import { MdPeopleOutline,  MdPeople } from 'react-icons/md'

interface TabMenuProps {
    state: string;
    setState: any;
}

const menuItems = [
    {
        title: 'Sobre',
        activeIcon: AiFillInfoCircle,
        inactiveIcon: AiOutlineInfoCircle,
    },
    {
        title: 'Participantes',
        activeIcon: MdPeople,
        inactiveIcon: MdPeopleOutline,
    }
]

export default function TabMenu({state, setState}: TabMenuProps) {
    return (
        <Flex
            borderBottom='1px solid black'
            marginBlock='2rem'
        >
            {menuItems.map( ({activeIcon, inactiveIcon, title}) => (
                <Flex
                    flex={1}
                    key={title}
                    justifyContent='center'
                    gap='1rem'
                    alignItems='center'
                    paddingBlock='1rem'
                    borderBottom={title == state ? '2px solid black': ''}
                    onClick={() => setState(title)}
                    _hover={{
                        cursor: 'pointer',
                    }}
                >
                    { title == state ? (
                        <>
                            <Icon w='1.5rem' h='1.5rem' as={activeIcon} />
                            <Text textStyle='h4' color='black' fontWeight={700}>{title}</Text>
                        </>
                    ) : (
                        <>
                            <Icon w='1.5rem' h='1.5rem' as={inactiveIcon} />
                            <Text textStyle='h4' fontWeight={400}>{title}</Text>
                        </>
                    )}
                </Flex>
            ))}
        </Flex>
    )
}