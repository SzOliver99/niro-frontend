import { Notification } from "$lib/stores/notifications";
import { wrapFetch } from "./api";

const contractApi = ({ baseFetch = fetch, user_token = null } = {}) => {
    const fetch = wrapFetch(baseFetch, user_token)

    return {
        create: async (customer, contract) => {
            const response = await fetch('/api/contract/create', {

                method: 'POST',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify({
                    customer: customer,
                    ...contract
                })
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        modify: async (contract_uuid, contract) => {
            const response = await fetch('/api/contract/modify', {
                method: 'PUT',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify({
                    contract_uuid,
                    ...contract
                })
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getAllByUserUuid: async (user_uuid) => {
            const response = await fetch(`/api/contract/get-all/${user_uuid}`, {
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
        getByUuid: async (contract_uuid) => {
            const response = await fetch(`/api/contract/${contract_uuid}`, {
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
        getCustomerUuid: async (contract_uuid) => {
            const response = await fetch(`/api/contract/${contract_uuid}/customer`, {
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
        changeState: async (contract_uuid, value) => {
            const response = await fetch(`/api/contract/${contract_uuid}/state`, {
                method: 'PUT',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify(value)
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        changeHandler: async (user_full_name, contract_uuids) => {
            const response = await fetch('/api/contract/change/user', {
                method: 'PUT',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify({ user_full_name, contract_uuids })
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        delete: async (contract_uuids) => {
            const response = await fetch('/api/contract/delete', {
                method: 'DELETE',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify(contract_uuids)
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
    }
}

export default contractApi