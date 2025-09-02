import { Notification } from "$lib/stores/notifications";
import { wrapFetch } from "./api";

const leadApi = ({ baseFetch = fetch, user_token = null } = {}) => {
    const fetch = wrapFetch(baseFetch, user_token)

    return {
        create: async (customer, lead) => {
            console.log({
                customer: customer,
                ...lead
            });

            const response = await fetch('/api/lead/create', {
                method: 'POST',
                body: JSON.stringify({
                    customer: customer,
                    ...lead
                })
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getAllByUserId: async (user_id) => {
            const response = await fetch('/api/lead/get-all', {
                method: 'POST',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify(user_id)
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        changeHandler: async (user_full_name, lead_ids) => {
            const response = await fetch('/api/lead/change/user', {
                method: 'POST',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify({ user_full_name, lead_ids })
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        delete: async (lead_ids) => {
            const response = await fetch('/api/lead/delete', {
                method: 'DELETE',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify(lead_ids)
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
    }
}

export default leadApi