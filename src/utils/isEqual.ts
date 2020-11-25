export const isEqual = (a: any, b: any): boolean => {
    if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
        if ((Array.isArray(a) && !Array.isArray(b)) || (!Array.isArray(a) && Array.isArray(b))) {
            return false;
        }

        if (Array.isArray(a)) {
            if (a.length !== b.length) {
                return false;
            }

            return a.every((item, index) => isEqual(item, b[index]));
        }
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);

        if (keysA.length !== keysB.length) {
            return false;
        }

        return keysA.every(item => isEqual(a[item], b[item]));
    } else {
        return Object.is(a, b);
    }
};
