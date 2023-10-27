export const parseDate = (date: string): string => {
    const parsedDate = new Date(date).toLocaleString('en-GB', {
        month: 'short',
        year: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
    return parsedDate;
};

export const minutesToHours = (time: number) => {
    const minutes = time % 60;
    const hours = Math.floor(time / 60);
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
};

function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
}

export const getMonth = (mon: string) => {
    return new Date(mon).toLocaleString('default', {month: 'long'});
};
