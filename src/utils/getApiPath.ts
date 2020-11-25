export const getApiPath = ({ host, path }: Partial<Record<'host' | 'path', string>>) => {
    return `${host ? `https://${host}` : ''}${path ? `${path}` : '' }`;
};
