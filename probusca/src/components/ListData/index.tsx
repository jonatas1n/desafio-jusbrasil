import { Stack } from "@chakra-ui/react"
import { FaLandmark, FaCalendar, FaBalanceScale, FaBuilding } from "react-icons/fa";
import ListDataItem from "./ListDataItem";

const data = {
    tribunal: 'TJCE - Sobral, CE',
    dataInicio: '12 de dezembro de 2012',
    assunto: 'Contatos de Consumo / Consórcio',
    orgaoJulgador: 'Juizado Especial Cível e Criminal da Comarca de Sobral'
}

export default function ListData() {
    const {tribunal, dataInicio, assunto, orgaoJulgador} = data;

    return (
        <Stack mt='2rem' spacing='3'>
            <ListDataItem
                label='Tribunal de Origem'
                value={tribunal}
                icon={FaLandmark}
            />
            <ListDataItem
                label='Início do Processo'
                value={dataInicio}
                icon={FaCalendar}
            />
            <ListDataItem
                label='Assunto'
                value={assunto}
                icon={FaBalanceScale}
            />
            <ListDataItem
                label='Órgão Julgador'
                value={orgaoJulgador}
                icon={FaBuilding}
            />
        </Stack>
    )
}