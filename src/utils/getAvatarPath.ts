export const getAvatarPath = (path: string | null) => {
    // eslint-disable-next-line prefer-destructuring
    const HOST = process.env.HOST;

    return path ? `${HOST ? `https://${HOST}` : ''}${path}` : '/assets/avatar.jpg';
};
