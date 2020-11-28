export function convertFromAPIResponse<T>(response: any): T {
    let parsed = response;

    if (typeof response === 'string') {
        parsed = JSON.parse(response);
    }

    const convertObject = (obj: object) => {
        return Object.entries(obj).reduce((curr, [key, value]) => ({ ...curr, [key.replace(/_\w/, (match) => match[1].toUpperCase())]: value }), {}) as T;
    };

    if (Array.isArray(parsed)) {
        return parsed.map(item => convertObject(item)) as unknown as T;
    } else {
        return convertObject(parsed) as T;
    }
}
