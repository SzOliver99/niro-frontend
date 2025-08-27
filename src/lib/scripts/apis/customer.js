import { Notification } from "$lib/stores/notifications";
import { wrapFetch } from "./api";

const customerApi = ({ baseFetch = fetch, user_token = null } = {}) => {
    const fetch = wrapFetch(baseFetch, user_token)

    return {
        create: async (customer) => {
            const response = await fetch('/api/customer/create', {
                method: 'POST',
                body: JSON.stringify(customer)
            });
            const data = await response.json();
            if (!response.ok) {
                Notification.error(data.error, 3);
            }

            return data;
        },
        getAllById: async (user_id) => {
            const response = await fetch('/api/customer/get-all', {
                method: 'POST',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify(user_id)
            });
            const data = await response.json();
            if (!response.ok) {
                Notification.error(data.error, 3);
            }

            return data;
        },
        changeCustomerUser: async (user_full_name, customer_ids) => {
            const response = await fetch('/api/customer/change/user', {
                method: 'POST',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify({ user_full_name, customer_ids })
            });
            const data = await response.json();
            if (!response.ok) {
                Notification.error(data.error, 3);
            }

            return data;
        },
        delete: async (customer_ids) => {
            const response = await fetch('/api/customer/delete', {
                method: 'DELETE',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify(customer_ids)
            });
            const data = await response.json();
            if (!response.ok) {
                Notification.error(data.error, 3);
            }

            return data;
        },
    }
}

export default customerApi