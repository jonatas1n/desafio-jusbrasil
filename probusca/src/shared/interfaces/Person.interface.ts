export interface Person {
    title: string;
    type: string;
    cpf: string;
};

export interface Attorney extends Person {
    oab: string;
}