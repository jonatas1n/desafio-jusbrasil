export interface SearchFilterProps {
    keyFilter: SearchFilterTypes;
    value: string;
}

export type SearchFilterTypes = 'court' | 'jurisdiction' | 'judgeBody' | 'judgeClass';

export interface SearchFiltersOptions {
    court: string[];
    jurisdiction: string[];
    judgeBody: string[];
    judgeClass: string[];
}