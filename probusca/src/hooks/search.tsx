import React, { useState, useCallback, createContext, useEffect, useContext } from 'react';

interface SearchContextData {
    showResults: boolean;
    handleShowResults: () => void;
}

const SearchContext = createContext<SearchContextData>({} as SearchContextData);

type SearchProviderProps = {
    children: React.ReactNode;
}

function SearchProvider({children}: SearchProviderProps ): JSX.Element {
    const [showResults, setShowResults] = useState(false);

    const handleShowResults = useCallback( () => {
        setShowResults(!showResults);
    }, [showResults]);

    return (
        <SearchContext.Provider
            value={{
                showResults,
                handleShowResults
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