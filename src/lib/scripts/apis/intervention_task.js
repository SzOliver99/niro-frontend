import { Notification } from "$lib/stores/notifications";
import { wrapFetch } from "./api";

const interventionTaskApi = ({ baseFetch = fetch, user_token = null } = {}) => {
    const fetch = wrapFetch(baseFetch, user_token)

    return {
        create: async (customer, intervention_task, customer_uuid, created_by) => {
            console.log({
                customer,
                intervention_task,
                created_by
            });

            const response = await fetch(`/api/intervention-task/create/${customer_uuid}`, {
                method: 'POST',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify({
                    customer,
                    intervention_task,
                    created_by
                })
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        modify: async (intervention_task_uuid, intervention_task) => {
            const response = await fetch(`/api/intervention-task/modify/${intervention_task_uuid}`, {
                method: 'PUT',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify(intervention_task)
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getAllByUserUuid: async (user_uuid) => {
            const response = await fetch(`/api/intervention-task/get-all/${user_uuid}`, {
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
        getByUuid: async (intervention_task_uuid) => {
            const response = await fetch(`/api/intervention-task/${intervention_task_uuid}`, {
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
        getCustomerUuid: async (intervention_task_uuid) => {
            const response = await fetch(`/api/intervention-task/${intervention_task_uuid}/customer`, {
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
        changeHandler: async (user_full_name, intervention_task_uuids) => {
            const response = await fetch('/api/intervention-task/change/user', {
                method: 'PUT',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify({ user_full_name, intervention_task_uuids })
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        delete: async (intervention_task_uuids) => {
            const response = await fetch('/api/intervention-task/delete', {
                method: 'DELETE',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify(intervention_task_uuids)
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
    }
}

export default interventionTaskApi