import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { processMovement } from '../../shared/interfaces/Process.interface';
import { FaFileAlt, FaStopwatch } from 'react-icons/fa'
import { Flex, Text, Box, Collapse, SlideFade } from '@chakra-ui/react';
import { useState } from 'react';

const movementList:processMovement[] = [
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    },
    {
        date: '25 de dezembro de 2022',
        content: 'Intimação expedido(a)'
    }
]

export default function Movement() {
    const [showPrevision, setShowPrevision] = useState(true);
    const handleShowPrevision = (state=!showPrevision) => {
        setShowPrevision(state);
    }

    return (
        <Flex direction='column' overflow='auto'>
            <VerticalTimeline layout='1-column-left' lineColor="#D9D9D9">
                { showPrevision && (
                    <SlideFade offsetY='2rem' in={showPrevision}>
                        <Flex
                            textAlign='right'
                            justifyContent='flex-end'
                        >
                            <Flex
                                p='1rem'
                                borderRadius='.5rem'
                                background='pallete.green'
                                gap='.5rem'
                                alignItems='center'
                            >
                                <Text textStyle='h2'>Movimentação</Text>
                                <FaStopwatch size='1.75rem' color='#494949'/>
                            </Flex>
                        </Flex>
                    </SlideFade>
                )}
            { movementList.map( (movement:processMovement, index:number) => (
                    <VerticalTimelineElement
                        key={index}
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'white', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  white' }}
                        iconStyle={{ background: '#388dc8', color: '#fff' }}
                        icon={<FaFileAlt />}
                    >
                        <p>{movement.content}</p>
                    </VerticalTimelineElement>
                ))}
                <Box
                    textAlign='center'
                    paddingLeft='3.3rem'
                >
                    <Text textStyle='h2'>Início do processo</Text>
                </Box>
            </VerticalTimeline>
        </Flex>
    )
}