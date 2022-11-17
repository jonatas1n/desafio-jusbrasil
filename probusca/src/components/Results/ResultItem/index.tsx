import { Text, Flex, UnorderedList, ListItem, Stack, useDisclosure, Collapse } from '@chakra-ui/react';
import Card from '../../Card';
import { FaNewspaper, FaCalendarAlt, FaLandmark } from 'react-icons/fa';
import { TiLocation } from 'react-icons/ti'
import { memo, useCallback, useState } from 'react';
import isEqual from 'react-fast-compare';

interface ResultItemProps {
    lawsuitID: string;
    subject: string[];
    jurisdiction: string;
    court: string;
    date: string;
}

function ResultItemComponent({lawsuitID, subject, jurisdiction, court, date}: ResultItemProps) {
    const [showSubjects, setShowSubjects] = useState(false);
    const { isOpen, onToggle } = useDisclosure();
    const subjects = subject.filter(item => item.length > 0);
    const link = lawsuitID.replaceAll('.','').replace('-', '');

    const setSubjectsVisible = useCallback(() => {
        if (subjects.length == 0 || showSubjects) return;
        setShowSubjects(true);
        onToggle();
    }, [onToggle, showSubjects, subjects]);

    const setSubjectsInvisible = useCallback(() => {
        if(!showSubjects) return;
        setShowSubjects(false);
        onToggle();
    }, [onToggle, showSubjects])

    return (
        <Card
            onMouseEnter={setSubjectsVisible}
            onMouseLeave={setSubjectsInvisible}
            link={'/process/?id=' + link}
            className='results__item'
        >
            <Text textStyle='h4' marginBottom='1rem'>Processo {lawsuitID}</Text>
            <Flex
                direction='column'
                justifyContent='flex-start'
                gap='1rem'
            >
                <Collapse in={isOpen} animateOpacity>
                    <Flex gap='.5rem' alignItems='flex-start'>
                        <FaNewspaper />
                        <Stack ml='1rem'>
                            <UnorderedList >
                            { subjects.map( (subjectsItem, index) => (
                                <ListItem key={index}>{subjectsItem}</ListItem>
                            ) ) }
                        </UnorderedList>
                        </Stack>
                    </Flex>
                </Collapse>
                <Flex alignItems='center' gap='2rem'>
                    <Flex gap='.5rem' alignItems='center'>
                        <FaLandmark />
                        <Text textStyle='h5'>{court}</Text>
                    </Flex>
                    <Flex gap='.5rem' alignItems='center'>
                        <TiLocation size='1.25rem'/>
                        <Text textStyle='h5'>{jurisdiction}</Text>
                    </Flex>
                    <Flex gap='.5rem' alignItems='center'>
                        <FaCalendarAlt />
                        <Text textStyle='h5'>{date}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}

const ResultItem = memo(ResultItemComponent, (p, n) => (
    isEqual(p, n)
));

export default ResultItem;