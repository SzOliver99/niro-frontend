import { writable, get } from 'svelte/store';
import { checkUserPermissions } from '$lib/scripts/apis/user.js';

function createPermissionsStore() {
    const { subscribe, set, update } = writable({
        hasPermission: false,
        loading: false,
        error: null,
        lastChecked: null
    });

    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    return {
        subscribe,
        async checkPermissions(token) {
            const store = get(this);
            const now = Date.now();

            // Return cached result if still valid
            if (store.lastChecked && (now - store.lastChecked) < CACHE_DURATION) {
                return store.hasPermission;
            }

            update(state => ({ ...state, loading: true, error: null }));

            try {
                const response = await checkUserPermissions(token);
                const hasPermission = response.data;

                update(state => ({
                    hasPermission,
                    loading: false,
                    error: null,
                    lastChecked: now
                }));

                return hasPermission;
            } catch (error) {
                update(state => ({
                    ...state,
                    loading: false,
                    error: error.message
                }));
                return false;
            }
        },
        reset() {
            set({
                hasPermission: false,
                loading: false,
                error: null,
                lastChecked: null
            });
        }
    };
}

export const permissionsStore = createPermissionsStore();
