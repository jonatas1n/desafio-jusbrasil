import { createContext, useCallback, useContext, useState, SetStateAction, Dispatch } from "react";
import { getProcess, getParticipants, getMovement } from '../services/api';
import { ProcessProps, ProcessParticipantProps, ProcessMovementProps } from "../shared/interfaces/Process.interface";
import { formatDate, formatLawsuitID } from '../utils/textFormat';

interface ProcessContextData {
    process: ProcessProps|undefined;
    movement: ProcessMovementProps[];
    handleProcess: (processID: string) => void;
    active: ProcessParticipantProps[];
    passive: ProcessParticipantProps[];
    others: ProcessParticipantProps[];
    showError: boolean;
    setShowError: Dispatch<SetStateAction<boolean>>;
}

const ProcessContext = createContext<ProcessContextData>({} as ProcessContextData);

type ProcessProviderProps = {
    children: React.ReactNode;
}

function ProcessProvider({children}: ProcessProviderProps): JSX.Element {
    const [process, setProcess] = useState<ProcessProps|undefined>(undefined);
    const [active, setActive] = useState<ProcessParticipantProps[]>([]);
    const [passive, setPassive] = useState<ProcessParticipantProps[]>([]);
    const [others, setOthers] = useState<ProcessParticipantProps[]>([]);
    const [movement, setMovement] = useState<ProcessMovementProps[]>([]);
    const [showError, setShowError] = useState(false);
    
    const handleProcess = useCallback((processID: string) => {
        getProcess(processID)
            .then(data => {
                data.date = formatDate(data.date);
                data.lawsuitID = formatLawsuitID(data.lawsuitID);
                return data;
            })
            .then(data => {
                setProcess(data);
                if(!process) setShowError(true);
            });

        getParticipants(processID)
            .then(data => {
                setActive(data.active);
                setPassive(data.passive);
                setOthers(data.others);
            });

        getMovement(processID)
            .then(data => (
                data.map((d:any) => {
                    d.data = formatDate(d.data, true);
                    return d;
                })
            ))
            .then(data => {
                setMovement(data);
            })
    }, []);

    return (
        <ProcessContext.Provider
            value={{
                process,
                handleProcess,
                active,
                passive,
                others,
                movement,
                showError,
                setShowError,
            }}
        >
            {children}
        </ProcessContext.Provider>
    )
}

function useProcess(): ProcessContextData {
    const context = useContext(ProcessContext);

    if(!context)
        throw new Error('useProcess must be used with an AuthProvider');

    return context;
}

export { ProcessProvider, useProcess }