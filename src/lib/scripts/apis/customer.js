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
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        modify: async (customer) => {
            const response = await fetch('/api/customer/modify', {
                method: 'PUT',
                body: JSON.stringify(customer)
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        saveComment: async (customer_uuid, comment) => {
            const response = await fetch(`/api/customer/comment/save/${customer_uuid}`, {
                method: 'PUT',
                body: JSON.stringify(comment)
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getAllByUserUuid: async (user_uuid) => {
            const response = await fetch(`/api/customer/get-all/${user_uuid}`, {
                headers: {
                    Authorization: user_token
                }
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getByUuid: async (customer_uuid) => {
            const response = await fetch(`/api/customer/get/${customer_uuid}`, {
                headers: {
                    Authorization: user_token
                }
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getLeadsByUuid: async (customer_uuid) => {
            const response = await fetch(`/api/customer/leads/${customer_uuid}`, {
                headers: {
                    Authorization: user_token
                }
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getContractByUuid: async (customer_uuid) => {
            const response = await fetch(`/api/customer/contracts/${customer_uuid}`, {
                headers: {
                    Authorization: user_token
                }
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getInterventionTasksByUuid: async (customer_uuid) => {
            const response = await fetch(`/api/customer/intervention-tasks/${customer_uuid}`, {
                headers: {
                    Authorization: user_token
                }
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        changeHandler: async (user_full_name, customer_uuids) => {
            const response = await fetch('/api/customer/change/user', {
                method: 'PUT',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify({ user_full_name, customer_uuids })
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        delete: async (customer_uuids) => {
            const response = await fetch('/api/customer/delete', {
                method: 'DELETE',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify(customer_uuids)
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
    }
}

export default customerApi