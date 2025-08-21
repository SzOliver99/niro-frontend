import { writable, get } from 'svelte/store';
import { checkUserPermissions } from '$lib/scripts/apis/user.js';

function createPermissionsStore() {
    const { subscribe, set, update } = writable({
        userRole: "",
        hasPermission: false,
        loading: false,
        error: null,
        lastChecked: null
    });

    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    return {
        subscribe,
        async checkPermissions(role) {
            const store = get(this);
            const now = Date.now();

            // Return cached result if still valid
            if (store.lastChecked && (now - store.lastChecked) < CACHE_DURATION) {
                return store.userRole;
            }

            update(state => ({ ...state, loading: true, error: null }));

            try {
                const response = await checkUserPermissions(role);
                const userRole = await response.json();

                update(state => ({
                    userRole,
                    hasPermission: userRole !== "Agent",
                    loading: false,
                    error: null,
                    lastChecked: now
                }));

                return userRole;
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
                userRole: "",
                hasPermission: false,
                loading: false,
                error: null,
                lastChecked: null
            });
        }
    };
}

export const permissionsStore = createPermissionsStore();
