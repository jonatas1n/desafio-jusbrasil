import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { ProcessMovementProps } from '../../shared/interfaces/Process.interface';
import { FaCircle, FaStopwatch } from 'react-icons/fa'
import { Flex, Text, Box, SlideFade } from '@chakra-ui/react';
import { useState } from 'react';
import { useProcess } from '../../hooks/process';

export default function Movement() {
    const { movement } = useProcess();
    const [showPrevision, setShowPrevision] = useState(false);
    const handleShowPrevision = (state=!showPrevision) => {
        setShowPrevision(state);
    }

    return (
        <Flex direction='column' overflowY={{lg: 'auto', md: 'auto', sm: 'unset'}} h={{lg: '100%', md: '100%', sm: 'unset'}}>
            <Box
                textAlign='center'
                paddingLeft='3.3rem'
                paddingBlock='4.125rem'
                background='pallete.background'
                mb='-1.75rem'
                zIndex={300}
            >
                <Text textStyle='h2'>Sem novas movimentações.</Text>
            </Box>
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
                { movement.map( (move:ProcessMovementProps, index:number) => (
                    <VerticalTimelineElement
                        key={index}
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'white', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  white' }}
                        iconStyle={{ background: '#388dc8', color: '#fff' }}
                        icon={<FaCircle />}
                    >
                        <Text textStyle='overline'>{move.data}</Text>
                        <Text textStyle='h2'>{move.content}</Text>
                    </VerticalTimelineElement>
                ))}
                
            </VerticalTimeline>
            <Box
                    textAlign='center'
                    paddingLeft='3.3rem'
                    pb='2rem'
                    >
                    <Text textStyle='h2'>Início do processo</Text>
            </Box>
        </Flex>
    )
}