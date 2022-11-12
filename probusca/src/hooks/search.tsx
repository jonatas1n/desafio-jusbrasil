import React, { useState, useCallback, createContext, useContext } from 'react';
import { search } from '../services/api'
import { ProcessProps } from '../shared/interfaces/Process.interface'
import { formatDate, formatLawsuitID } from '../utils/textFormat';

interface SearchContextData {
    results: Array<ProcessProps>;
    showResults: boolean;
    filters: Array<{
        title: string;
        value: string;
    }>;
    handleShowResults: () => void;
    handleSearch: (searchTerm: string) => void;
}

const SearchContext = createContext<SearchContextData>({} as SearchContextData);

type SearchProviderProps = {
    children: React.ReactNode;
}

function SearchProvider({children}: SearchProviderProps ): JSX.Element {
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState<ProcessProps[]>([]);
    const [filters, setFilters] = useState([]);

    const handleSearch = useCallback( async (searchTerm: string) => {
        search(searchTerm)
            .then(response => {
                response = response.items;
                response = response.map( (r:any) => {
                    r.subject = r.subject.split('-');
                    r.date = formatDate(r.date);
                    r.lawsuitID = formatLawsuitID(r.lawsuitID);
                    return r;
                });
                setResults(response);
                setShowResults(true);
            });
    }, [])

    const handleShowResults = useCallback( () => {
        setShowResults(!showResults);
    }, [showResults]);

    return (
        <SearchContext.Provider
            value={{
                results,
                showResults,
                handleShowResults,
                handleSearch,
                filters
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}

function useSearch(): SearchContextData {
    const context = useContext(SearchContext);

    if(!context) 
        throw new Error('useSearch must be used with an AuthProvider');

    return context;
}

export { SearchProvider, useSearch }