export const cleanObject = (obj: { [key: string]: string }) => {
    const res: { [key: string]: string } = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];

            if (value !== undefined && value !== null) {
                res[key] = obj[key];
            }
        }
    }

    return res;
}