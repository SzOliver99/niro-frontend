export function wrapFetch(baseFetch) {
    return async function customFetch(input, init = {}) {
        const headers = new Headers(init.headers || {});
        const method = (init.method || 'GET').toUpperCase();

        if (init.body && method !== 'GET' && !headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json');
        }

        // Only include Authorization if explicitly passed
        if (headers.has('Authorization') && init.authorization) {
            headers.set('Authorization', init.authorization);
        }

        return baseFetch(input, { ...init, headers });
    };
}