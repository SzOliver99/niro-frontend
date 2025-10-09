import { Notification } from "$lib/stores/notifications";
import { wrapFetch } from "./api";

const recommendationApi = ({ baseFetch = fetch, user_token = null } = {}) => {
    const fetch = wrapFetch(baseFetch, user_token)

    return {
        create: async (user_uuid, recommendation) => {
            const response = await fetch(`/api/recommendation/create/${user_uuid}`, {
                method: 'POST',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify(recommendation)
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        modify: async (recommendation_uuid, recommendation) => {
            const response = await fetch(`/api/recommendation/modify/${recommendation_uuid}`, {
                method: 'PUT',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify(recommendation)
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getAllByUserUuid: async (user_uuid) => {
            const response = await fetch(`/api/recommendation/get-all/${user_uuid}`, {
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
        getByUuid: async (recommendation_uuid) => {
            const response = await fetch(`/api/recommendation/${recommendation_uuid}`, {
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
        changeHandler: async (user_full_name, recommendation_uuids) => {
            const response = await fetch('/api/recommendation/change/user', {
                method: 'PUT',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify({ user_full_name, recommendation_uuids })
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        delete: async (recommendation_uuids) => {
            const response = await fetch('/api/recommendation/delete', {
                method: 'DELETE',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify(recommendation_uuids)
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        }
    }
}

export default recommendationApi