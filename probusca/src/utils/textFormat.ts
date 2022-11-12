export function formatDate(date: string, getHours:boolean=false) {
    const setTwoDigits = (number: number) => number < 10 ? `0${number}` : number;

    let dateObj = new Date(date);
    let month = setTwoDigits(dateObj.getMonth());
    let day = setTwoDigits(dateObj.getDate());
    let year = dateObj.getFullYear();
    date = `${day}/${month}/${year}`;

    if(!getHours) return date;

    let hours = dateObj.getHours();
    let minutes = setTwoDigits(dateObj.getMinutes());
    let seconds = setTwoDigits(dateObj.getSeconds());
    date += ` - ${hours}:${minutes}:${seconds}`;

    return date;
};

export function formatLawsuitID(lawsuitID:string) {
    let sequencial = lawsuitID.slice(0, 7);
    let dd = lawsuitID.slice(7, 9);
    let year = lawsuitID.slice(9, 13);
    let j = lawsuitID[13];
    let tr = lawsuitID.slice(14, 16);
    let origin = lawsuitID.slice(16, 20);
    return `${sequencial}-${dd}.${year}.${j}.${tr}.${origin}`;
}