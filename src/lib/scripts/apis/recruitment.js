import { Notification } from "$lib/stores/notifications";
import { wrapFetch } from "./api";

const recruitmentApi = ({ baseFetch = fetch, user_token = null } = {}) => {
    const fetch = wrapFetch(baseFetch, user_token);

    return {
        create: async (recruitment) => {
            const response = await fetch(`/api/recruitment/create`, {
                method: 'POST',
                headers: { Authorization: user_token },
                body: JSON.stringify(recruitment)
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }
            return data;
        },
        modify: async (recruitment_uuid, recruitment) => {
            const response = await fetch(`/api/recruitment/modify`, {
                method: 'PUT',
                headers: { Authorization: user_token },
                body: JSON.stringify({ recruitment_uuid, ...recruitment })
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }
            return data;
        },
        getAll: async () => {
            const response = await fetch(`/api/recruitment/get-all`, {
                headers: { Authorization: user_token }
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }
            return data;
        },
        getByUuid: async (recruitment_uuid) => {
            const response = await fetch(`/api/recruitment/${recruitment_uuid}`, {
                headers: { Authorization: user_token }
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }
            return data;
        },
        delete: async (recruitment_uuid) => {
            const response = await fetch(`/api/recruitment/${recruitment_uuid}`, {
                method: 'DELETE',
                headers: { Authorization: user_token }
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }
            return data;
        }
    };
};

export default recruitmentApi;
