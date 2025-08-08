import { writable } from 'svelte/store';

function createNotificationStore() {
    const { subscribe, update } = writable([]);

    let counter = 0;

    function show(type, message, duration = 5000, title = '') {
        const id = ++counter;
        update(toasts => [...toasts, { id, type, message, title, duration }]);

        if (duration > 0) {
            setTimeout(() => dismiss(id), duration);
        }
    }

    function dismiss(id) {
        update(toasts => toasts.filter(t => t.id !== id));
    }

    return {
        subscribe,
        success: (msg, duration, title) => show('success', msg, duration, title),
        error: (msg, duration, title) => show('error', msg, duration, title),
        warning: (msg, duration, title) => show('warning', msg, duration, title),
        info: (msg, duration, title) => show('info', msg, duration, title),
        dismiss
    };
}

export const Notification = createNotificationStore();
