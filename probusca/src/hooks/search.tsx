import React, { useState, useCallback, createContext, useContext } from 'react';
import { search, filteredSearch } from '../services/api'
import { ProcessProps } from '../shared/interfaces/Process.interface'
import { formatDate, formatLawsuitID } from '../utils/textFormat';
import { SearchFilterProps, SearchFilterTypes } from '../shared/interfaces/Search.interface';

interface SearchContextData {
    results: Array<ProcessProps>;
    showResults: boolean;
    filters: SearchFilterProps[];
    handleShowResults: () => void;
    handleSearch: (searchTerm: string) => void;
    addFilter: (filterKey: SearchFilterTypes, filterValue: string) => void;
    removeFilter: (filterKey: string) => void;
}

const SearchContext = createContext<SearchContextData>({} as SearchContextData);

type SearchProviderProps = {
    children: React.ReactNode;
}

function SearchProvider({children}: SearchProviderProps ): JSX.Element {
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState<ProcessProps[]>([]);
    const [filters, setFilters] = useState<SearchFilterProps[]>([]);

    const addFilter = (filterKey: SearchFilterTypes, filterValue: string) => {
        let newFilters = filters.filter( ({keyFilter, value}) => keyFilter != filterKey );
        let newItem:SearchFilterProps = {keyFilter: filterKey, value: filterValue};
        newFilters.push(newItem);
        setFilters(newFilters);
    }

    const removeFilter = (filterKey: string) => {
        let newFilters = filters.filter( ({keyFilter, value}) => keyFilter != filterKey );
        setFilters(newFilters);
    }

    const handleSearch = useCallback( async (searchTerm: string) => {
        if(!!filters) {
            filteredSearch(searchTerm, filters)
                .then( response => {
                    response = response.items;
                    response = response.map( (r:any) => {
                        r.subject = r.subject.split('-');
                        r.date = formatDate(r.date);
                        r.lawsuitID = formatLawsuitID(r.lawsuitID);
                        return r;
                    });
                    setResults(response);
                    setShowResults(true);
                } );
            return;
        };

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
    }, [filters])

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
                filters,
                addFilter,
                removeFilter,
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