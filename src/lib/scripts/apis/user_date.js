import { Notification } from "$lib/stores/notifications";
import { wrapFetch } from "./api";

const userDateApi = ({ baseFetch = fetch, user_token = null } = {}) => {
    const fetch = wrapFetch(baseFetch, user_token)

    return {
        create: async (user_date) => {
            const response = await fetch('/api/dates/create', {
                method: 'POST',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify(user_date)
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getAllByUserUuid: async (user_uuid, selected_month) => {
            const response = await fetch('/api/dates/get-all', {
                method: 'POST',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify({ user_uuid, selected_month })
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        changeHandler: async (user_full_name, date_uuids) => {
            const response = await fetch('/api/dates/change/user', {
                method: 'POST',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify({ user_full_name, date_uuids })
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        changeState: async (date_uuid, value) => {
            const response = await fetch('/api/dates/change/state', {
                method: 'POST',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify({ date_uuid, value })
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        delete: async (date_uuids) => {
            const response = await fetch('/api/dates/delete', {
                method: 'DELETE',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify(date_uuids)
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
    }
}

export default userDateApi