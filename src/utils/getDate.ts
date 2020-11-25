export const getDate = (date: string): string => {
    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];

    const d = new Date(date);

    if (isNaN(Date.parse(d.toUTCString()))) {
        return '';
    }

    return `${d.getDate()} ${months[d.getMonth()]}`;
};
