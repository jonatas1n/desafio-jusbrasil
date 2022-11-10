import { Flex } from '@chakra-ui/react';
import { FaBalanceScaleLeft, FaBalanceScaleRight } from 'react-icons/fa';
import ParticipantGroup from './ParticipantGroup';

const lists = {
    activeList: [
        {
            title: 'jerri adriane rodrigues costa',
            type: 'Autor',
            cpf: '028.064.983-50'
        },
        {
            title: 'LUCAS EVANGELISTA DE SOUSA NETO',
            type: 'Advogado',
            cpf: '028.064.983-50',
            oab: 'PI0009213A'
        }
    ],
    passiveList: [
        {
            title: 'ELETROFACIL - COMERCIO DE ELETRODOMESTICOS LTDA - EPP',
            cnpj: '05.988.869/0001-00',
            type: 'Réu'
        }
    ]
}

export default function Participants() {
    const { activeList, passiveList } = lists;

    return (
        <Flex
            direction='column'
            pt='1.5rem'
        >
            <ParticipantGroup
                list={activeList}
                icon={FaBalanceScaleLeft}
            />
            <ParticipantGroup
                list={passiveList}
                icon={FaBalanceScaleRight}
            />
        </Flex>
    )
}