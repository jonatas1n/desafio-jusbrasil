import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

export const search = (searchTerm: string, size: number = 30) => {
    const response = api.get('', { params: { search: searchTerm, size: size } })
        .then(response => response.data);
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

export const getFiltersList = (filterKey: string) => {
    const response = api.get('/filters/' + filterKey)
        .then( response => response.data );
    return response;
}