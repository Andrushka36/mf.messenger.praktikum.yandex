export const getTime = (date: string): string => {
    const d = new Date(date);

    if (isNaN(Date.parse(d.toUTCString()))) {
        return '';
    }

    const h = d.getHours();
    const m = d.getMinutes();

    return `${h}:${m < 10 ? `0${m}` : m}`;
};
