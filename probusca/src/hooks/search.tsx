import React, { useState, useCallback, createContext, useEffect, useContext } from 'react';

interface SearchContextData {
    results: Array<{
        title: string,
        code: string;
        link: string;
        vara?: string;
    }>;
    recents: Array<{
        title: string,
        code: string;
        link: string;
    }>;
    showResults: boolean;
    handleShowResults: () => void;
}

const recentsList = [
    {
        title: 'Jerri Adriane Rodrigues Costa x Eletrofacil - Comercio de Eletrodomésticos LTDA - EPP',
        code: '3938007-10.2012.8.06.0167',
        link: '/'
    },
    {
        title: 'Jerri Adriane Rodrigues Costa x Eletrofacil - Comercio de Eletrodomésticos LTDA - EPP',
        code: '3938007-10.2012.8.06.0167',
        link: '/'
    },
    {
        title: 'Jerri Adriane Rodrigues Costa x Eletrofacil - Comercio de Eletrodomésticos LTDA - EPP',
        code: '3938007-10.2012.8.06.0167',
        link: '/'
    },
    {
        title: 'Jerri Adriane Rodrigues Costa x Eletrofacil - Comercio de Eletrodomésticos LTDA - EPP',
        code: '3938007-10.2012.8.06.0167',
        link: '/'
    },
]

const resultsList = [
    {
        title: 'Jerri Adriane Rodrigues Costa x Eletrofacil - Comercio de Eletrodomésticos LTDA - EPP',
        code: '3938007-10.2012.8.06.0167',
        link: '/'
    },
    {
        title: 'Jerri Adriane Rodrigues Costa x Eletrofacil - Comercio de Eletrodomésticos LTDA - EPP',
        code: '3938007-10.2012.8.06.0167',
        link: '/'
    },
    {
        title: 'Jerri Adriane Rodrigues Costa x Eletrofacil - Comercio de Eletrodomésticos LTDA - EPP',
        code: '3938007-10.2012.8.06.0167',
        link: '/'
    },
    {
        title: 'Jerri Adriane Rodrigues Costa x Eletrofacil - Comercio de Eletrodomésticos LTDA - EPP',
        code: '3938007-10.2012.8.06.0167',
        link: '/'
    },
]

const SearchContext = createContext<SearchContextData>({} as SearchContextData);

type SearchProviderProps = {
    children: React.ReactNode;
}

function SearchProvider({children}: SearchProviderProps ): JSX.Element {
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(resultsList);
    const [recents, setRecents] = useState(recentsList);

    const handleShowResults = useCallback( () => {
        setShowResults(!showResults);
    }, [showResults]);

    return (
        <SearchContext.Provider
            value={{
                results,
                recents,
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