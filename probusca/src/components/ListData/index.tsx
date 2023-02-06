import { Icon, Stack, Flex, UnorderedList, Text, ListItem } from "@chakra-ui/react"
import { FaLandmark, FaCalendarAlt, FaBalanceScale, FaBuilding, FaFileAlt } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import { useProcess } from "../../hooks/process";
import ListDataItem from "./ListDataItem";

export default function ListData() {
    const { process, movement } = useProcess();

    return (
        <Stack spacing='3'>
            <ListDataItem
                label='Tribunal de Origem'
                value={process?.court}
                icon={FaLandmark}
            />
            <ListDataItem
                label='Comarca'
                value={process?.jurisdiction}
                icon={TiLocation}
            />
            <ListDataItem
                label='Início do Processo'
                value={process?.date}
                icon={FaCalendarAlt}
            />
            {!!movement && <ListDataItem
                label='Última movimentação'
                value={movement.at(-1)?.data}
                icon={FaFileAlt}
            /> }
            <Flex gap='1rem'>
                <Icon as={FaBalanceScale} color='black' mt='.25rem'/>
                <Flex direction='column'>
                    <Text textStyle='h4' fontSize='1rem'>Assuntos</Text>
                    <UnorderedList>
                        {process?.subject?.map( (subject, index) => {
                            subject = subject.trim();
                            if(subject.at(-1) != ')') subject = subject + ')';
                            return (
                                <ListItem key={index} textTransform='capitalize'>{subject.toLowerCase()}</ListItem>
                            )
                        })}
                    </UnorderedList>
                </Flex>
            </Flex>
            <ListDataItem
                label='Órgão Julgador'
                value={process?.judgeBody}
                icon={FaBuilding}
            />
        </Stack>
    )
}