export function convertToAPIRequest<T>(request: object): T {
    return Object.entries(request).reduce((curr, [key, value]) => ({ ...curr, [key.replace(/[A-Z]/, (match) => `_${match.toLowerCase()}`)]: value }), {}) as T;
}
