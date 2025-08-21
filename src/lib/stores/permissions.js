import { getUserRole } from '$lib/scripts/apis/user';
import { writable, get } from 'svelte/store';

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
        async checkPermissions(user) {
            const store = get(this);
            const now = Date.now();

            if (store.lastChecked && (now - store.lastChecked) < CACHE_DURATION) {
                return store.userRole;
            }

            update(state => ({ ...state, loading: true, error: null }));

            try {
                const response = await getUserRole(user);
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
