import { Text, Flex, UnorderedList, ListItem, Stack, useDisclosure, Collapse } from '@chakra-ui/react';
import Card from '../../Card';
import { FaNewspaper, FaLandmark, FaCalendar } from 'react-icons/fa';
import { useState } from 'react';

interface ResultItemProps {
    lawsuitID: string;
    subject: string[];
    jurisdiction: string;
    date: string;
}

export default function ResultItem({lawsuitID, subject, jurisdiction, date}: ResultItemProps) {
    const [showSubjects, setShowSubjects] = useState(false);
    const { isOpen, onToggle } = useDisclosure();
    const subjects = subject.filter(item => item.length > 0);
    const link = lawsuitID.replaceAll('.','').replace('-', '');

    const setSubjectsVisible = () => {
        if (subjects.length == 0 || showSubjects) return;
        setShowSubjects(true);
        onToggle();
    };

    const setSubjectsInvisible = () => {
        if(!showSubjects) return;
        setShowSubjects(false);
        onToggle();
    }

    return (
        <Card
            onMouseEnter={setSubjectsVisible}
            onMouseLeave={setSubjectsInvisible}
            link={'/process/?id=' + link}
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
                        <Text textStyle='h5'>{jurisdiction}</Text>
                    </Flex>
                    <Flex gap='.5rem' alignItems='center'>
                        <FaCalendar />
                        <Text textStyle='h5'>{date}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    )
}