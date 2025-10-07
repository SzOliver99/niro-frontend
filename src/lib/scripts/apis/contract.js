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

        // CHART API's
        getProductionValue: async (user_uuid = null) => {
            let response;
            if (user_uuid === "self") {
                response = await fetch(`/api/contract/chart/production/value`, {
                    headers: {
                        Authorization: user_token
                    }
                });
            } else if (typeof user_uuid === "string" && user_uuid !== "self") {
                response = await fetch(`/api/contract/chart/production/value/${user_uuid}`, {
                    headers: {
                        Authorization: user_token
                    }
                });
            } else {
                response = await fetch('/api/contract/chart/production/value/get-all', {
                    headers: {
                        Authorization: user_token
                    }
                });
            }
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getProductionCount: async (user_uuid = null) => {
            let response;
            if (user_uuid === "self") {
                response = await fetch(`/api/contract/chart/production/count`, {
                    headers: {
                        Authorization: user_token
                    }
                });
            } else if (typeof user_uuid === "string" && user_uuid !== "self") {
                response = await fetch(`/api/contract/chart/production/count/${user_uuid}`, {
                    headers: {
                        Authorization: user_token
                    }
                });
            } else {
                response = await fetch('/api/contract/chart/production/count/get-all', {
                    headers: {
                        Authorization: user_token
                    }
                });
            }
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getPortfolioChart: async (user_uuid = null) => {
            let response;
            if (user_uuid === "self") {
                response = await fetch(`/api/contract/chart/portfolio`, {
                    headers: {
                        Authorization: user_token
                    }
                });
            } else if (typeof user_uuid === "string" && user_uuid !== "self") {
                response = await fetch(`/api/contract/chart/portfolio/${user_uuid}`, {
                    headers: {
                        Authorization: user_token
                    }
                });
            } else {
                response = await fetch('/api/contract/chart/portfolio/get-all', {
                    headers: {
                        Authorization: user_token
                    }
                });
            }
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getWeeklyProductionChart: async (user_uuid = null, start_date, end_date) => {
            let response;
            if (user_uuid === "self") {
                response = await fetch(`/api/contract/chart/weekly`, {
                    method: 'POST',
                    headers: {
                        Authorization: user_token
                    },
                    body: JSON.stringify({ start_date, end_date })
                });
            } else if (typeof user_uuid === "string" && user_uuid !== "self") {
                response = await fetch(`/api/contract/chart/weekly/${user_uuid}`, {
                    method: 'POST',
                    headers: {
                        Authorization: user_token
                    },
                    body: JSON.stringify({ start_date, end_date })
                });
            } else {
                response = await fetch('/api/contract/chart/weekly/get-all', {
                    method: 'POST',
                    headers: {
                        Authorization: user_token
                    },
                    body: JSON.stringify({ start_date, end_date })
                });
            }
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getMonthlyProductionValueChart: async (user_uuid = null, start_date, end_date) => {
            let response;
            if (user_uuid === "self") {
                response = await fetch(`/api/contract/chart/monthly/value`, {
                    method: 'POST',
                    headers: {
                        Authorization: user_token
                    },
                    body: JSON.stringify({ start_date, end_date })
                });
            } else if (typeof user_uuid === "string" && user_uuid !== "self") {
                response = await fetch(`/api/contract/chart/monthly/value/${user_uuid}`, {
                    method: 'POST',
                    headers: {
                        Authorization: user_token
                    },
                    body: JSON.stringify({ start_date, end_date })
                });
            } else {
                response = await fetch('/api/contract/chart/monthly/value/get-all', {
                    method: 'POST',
                    headers: {
                        Authorization: user_token
                    },
                    body: JSON.stringify({ start_date, end_date })
                });
            }
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getMonthlyProductionChart: async (user_uuid = null, start_date, end_date) => {
            let response;
            if (user_uuid === "self") {
                response = await fetch(`/api/contract/chart/monthly/production`, {
                    method: 'POST',
                    headers: {
                        Authorization: user_token
                    },
                    body: JSON.stringify({ start_date, end_date })
                });
            } else if (typeof user_uuid === "string" && user_uuid !== "self") {
                response = await fetch(`/api/contract/chart/monthly/production/${user_uuid}`, {
                    method: 'POST',
                    headers: {
                        Authorization: user_token
                    },
                    body: JSON.stringify({ start_date, end_date })
                });
            } else {
                response = await fetch('/api/contract/chart/monthly/production/get-all', {
                    method: 'POST',
                    headers: {
                        Authorization: user_token
                    },
                    body: JSON.stringify({ start_date, end_date })
                });
            }
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        }
    }
}

export default contractApi