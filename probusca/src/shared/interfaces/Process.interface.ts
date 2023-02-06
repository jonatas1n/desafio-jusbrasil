export interface ProcessProps {
    court: string;
    date: string;
    judgeBody: string;
    judgeClass: string;
    jurisdiction: string;
    lawsuitID: string;
    state: string;
    subject: string[];
}

export interface ProcessMovementProps {
    data: string;
    content: string;
}

export interface ProcessParticipantProps {
    type: string;
    is_active: boolean | string;
    name: string;
    OAB?: string;
    text: string;
    id: string;
}