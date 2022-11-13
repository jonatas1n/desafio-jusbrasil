import React, { useState, useCallback, createContext, useContext, SetStateAction, Dispatch, useEffect } from 'react';
import { search, filteredSearch, getFiltersList } from '../services/api'
import { ProcessProps } from '../shared/interfaces/Process.interface'
import { formatDate, formatLawsuitID } from '../utils/textFormat';
import { SearchFilterProps, SearchFiltersOptions, SearchFilterTypes } from '../shared/interfaces/Search.interface';

interface SearchContextData {
    results: Array<ProcessProps>;
    showResults: boolean;
    filters: SearchFilterProps[];
    filtersOptions: SearchFiltersOptions|undefined;
    totalResults: number;
    setFilters: Dispatch<SetStateAction<SearchFilterProps[]>>;
    handleSearch: (searchTerm: string) => void;
    addFilter: (filterKey: SearchFilterTypes, filterValue: string) => void;
    removeFilter: (filterKey: string) => void;
    getFilterOptions: (filterKey: SearchFilterTypes) => string[];
    moreResults: () => void;
    cleanResults: () => void;
    handleFilterOptions: () => void;
}

const SearchContext = createContext<SearchContextData>({} as SearchContextData);

type SearchProviderProps = {
    children: React.ReactNode;
}

function SearchProvider({children}: SearchProviderProps ): JSX.Element {
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState<ProcessProps[]>([]);
    const [filters, setFilters] = useState<SearchFilterProps[]>([]);
    const [filtersOptions, setFiltersOptions] = useState<SearchFiltersOptions|undefined>(undefined);

    const [totalResults, setTotalResults] = useState(0);
    const [actualPage, setActualPage] = useState(1);
    const [lastSearch, setLastSearch] = useState('');

    const handleFilterOptions = useCallback(() => {
        getFiltersList(filters)
            .then(data => setFiltersOptions(data));
    }, [filters]);

    const addFilter = useCallback( (filterKey: SearchFilterTypes, filterValue: string) => {
        let newFilters = filters.filter( ({keyFilter, value}) => keyFilter != filterKey );
        let newItem:SearchFilterProps = {keyFilter: filterKey, value: filterValue};
        newFilters.push(newItem);
        setFilters(newFilters);
        handleFilterOptions();
    }, [filters, handleFilterOptions]);

    const removeFilter = useCallback((filterKey: string) => {
        let newFilters = filters.filter( ({keyFilter, value}) => keyFilter != filterKey );
        setFilters(newFilters);
        handleFilterOptions();
    }, [filters, handleFilterOptions]);
    
    const getFilterOptions = useCallback((filterKey: SearchFilterTypes) => {
        if(!filtersOptions) return [];
        return filtersOptions[filterKey];
    }, [filtersOptions]);

    const handleSearch = useCallback( async (searchTerm: string) => {
        setLastSearch(searchTerm);
        if(filters.length) {
            filteredSearch(searchTerm, filters, actualPage)
                .then( response => {
                    setTotalResults(response.total);
                    response = response.items;
                    response = response.map( (r:any) => {
                        r.subject = r.subject.split('-');
                        r.date = formatDate(r.date);
                        r.lawsuitID = formatLawsuitID(r.lawsuitID);
                        return r;
                    });
                    setResults([...results, ...response]);
                    setShowResults(true);
                } );
                return;
            };
            
            search(searchTerm, actualPage)
            .then(response => {
                setTotalResults(response.total);
                response = response.items;
                response = response.map( (r:any) => {
                    r.subject = r.subject.split('-');
                    r.date = formatDate(r.date);
                    r.lawsuitID = formatLawsuitID(r.lawsuitID);
                    return r;
                });
                setResults([...results, ...response]);
                setShowResults(true);
            });

            handleFilterOptions();
        }, [actualPage, filters, handleFilterOptions, results])
        
    const moreResults = useCallback( () => {
        if(totalResults <= results.length) return;
        setActualPage(actualPage+1)
        handleSearch(lastSearch)
    }, [actualPage, handleSearch, lastSearch, results.length, totalResults])

    const cleanResults = useCallback( () => {
        setResults([]);
        setActualPage(1);
        setTotalResults(0);
    }, []);

    useEffect( () => {
        handleFilterOptions();
    }, [filters, handleFilterOptions] )

    return (
        <SearchContext.Provider
            value={{
                results,
                showResults,
                totalResults,
                handleSearch,
                filters,
                filtersOptions,
                setFilters,
                addFilter,
                removeFilter,
                getFilterOptions,
                moreResults,
                cleanResults,
                handleFilterOptions
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