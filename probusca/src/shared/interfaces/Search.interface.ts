export interface SearchFilterProps {
    keyFilter: SearchFilterTypes;
    value: string;
}

export type SearchFilterTypes = "court" | 'jurisdiction' | 'judgeBody' | 'judgeClass';