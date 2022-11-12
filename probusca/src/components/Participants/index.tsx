import { Stack } from '@chakra-ui/react';
import { FaBalanceScaleLeft, FaBalanceScaleRight, FaCircle } from 'react-icons/fa';
import ParticipantGroup from './ParticipantGroup';
import { useProcess } from '../../hooks/process';

export default function Participants() {
    const { active, passive, others } = useProcess();

    return (
        <Stack
            direction='column'
            h='100%'
            spacing='3rem'
        >
            { active.length && <ParticipantGroup
                title='Polo ativo'
                list={active}
                icon={FaBalanceScaleLeft}
            /> }
            { passive.length && <ParticipantGroup
                title='Polo passivo'
                list={passive}
                icon={FaBalanceScaleRight}
            /> }
            { others.length && <ParticipantGroup
                title='Outros participantes'
                list={others}
                icon={FaCircle}
            /> }
        </Stack>
    )
}