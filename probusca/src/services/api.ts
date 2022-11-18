import axios from 'axios';
import { SearchFilterProps } from '../shared/interfaces/Search.interface';

const api = axios.create({
    baseURL: '/api',
});

export const search = (searchTerm: string, page: number = 1) => {
    const response = api.get('', { params: { search: searchTerm, size: 30, page: page} })
        .then(response => response.data);
    return response;
}

export const filteredSearch = (searchTerm: string, filters: SearchFilterProps[], actualPage: number=1) => {
    let filtersEntries = filters.map(filter => Object.values(filter));
    filtersEntries.push(['search', searchTerm]);
    filtersEntries.push(['page', actualPage]);
    const response = api.post('', Object.fromEntries(filtersEntries))
        .then( response => response.data );
    return response;
}

export const getProcess = (processID: string) => {
    const response = api.get('/'+processID,)
        .then( response => response.data )
        .then( data => {
            data.subject = data.subject.split('-');
            return data;
        } );
    return response;
}

export const getParticipants = async (processID: string) => {
    const active = api.get('/participants/' + processID, { params: {type: 'active'} })
        .then( response => response.data );

    const passive = api.get('/participants/' + processID, { params: {type: 'passive'} })
        .then( response => response.data );

    const others = api.get('/participants/' + processID, { params: {type: 'others'} })
        .then( response => response.data );

    const response = Promise.all([active, passive, others])
        .then( ([activeData, passiveData, othersData]) => (
            {
                active: activeData,
                passive: passiveData,
                others: othersData,
            }
        ))

    return response;
}

export const getMovement = (processID: string) => {
    const response = api.get('/movement/' + processID,)
        .then( response => response.data );
    return response;
}

export const getFiltersList = (filters: SearchFilterProps[]) => {
    const filtersEntries = filters.map(filter => Object.values(filter));
    const response = api.post('/filters/', Object.fromEntries(filtersEntries))
        .then( response => response.data);
    return response;
}