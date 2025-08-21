import { writable } from 'svelte/store';

function createNotificationStore() {
    const { subscribe, update } = writable([]);

    let counter = 0;

    function show(type, message, duration = 3000) {
        const id = ++counter;
        update(toasts => [...toasts, { id, type, message, duration }]);

        if (duration > 0) {
            setTimeout(() => dismiss(id), duration);
        }
    }

    function dismiss(id) {
        update(toasts => toasts.filter(t => t.id !== id));
    }

    return {
        subscribe,
        success: (msg, duration) => show('success', msg, duration * 1000),
        error: (msg, duration) => show('error', msg, duration * 1000),
        warning: (msg, duration) => show('warning', msg, duration * 1000),
        info: (msg, duration) => show('info', msg, duration * 1000),
        dismiss
    };
}

export const Notification = createNotificationStore();
