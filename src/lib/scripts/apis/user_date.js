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
        modify: async (date_uuid, user_date) => {
            const response = await fetch('/api/dates/modify', {
                method: 'PUT',
                headers: {
                    Authorization: user_token
                },
                body: JSON.stringify({ date_uuid, ...user_date })
            });
            const data = await response.json();
            if (!response.ok) {
                await Promise.reject(Notification.error(data.error, 3));
            }

            return data;
        },
        getAllByUserUuid: async (user_uuid, selected_month) => {
            const response = await fetch(`/api/dates/${user_uuid}/${selected_month}`, {
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
        getByUuid: async (date_uuid) => {
            const response = await fetch(`/api/dates/${date_uuid}`, {
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
        changeState: async (date_uuid, value) => {
            const response = await fetch(`/api/dates/${date_uuid}/state`, {
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
        changeHandler: async (user_full_name, date_uuids) => {
            const response = await fetch('/api/dates/change/user', {
                method: 'PUT',
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

        // CHART API'S
        getIsCompletedChart: async (user_uuid = null) => {
            let response;
            if (typeof user_uuid == "string") {
                response = await fetch(`/api/dates/chart/is-completed/${user_uuid}`, {
                    headers: {
                        Authorization: user_token
                    }
                });
            } else {
                response = await fetch('/api/dates/chart/is-completed/get-all', {
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
        getMeetTypeChart: async (user_uuid = null) => {
            let response;
            if (typeof user_uuid == "string") {
                response = await fetch(`/api/dates/chart/meet-type/${user_uuid}`, {
                    headers: {
                        Authorization: user_token
                    }
                });
            } else {
                response = await fetch('/api/dates/chart/meet-type/get-all', {
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
        getDatesWeeklyChart: async (user_uuid = null, start_date, end_date) => {
            let response;
            if (typeof user_uuid == "string") {
                response = await fetch(`/api/dates/chart/weekly/${user_uuid}`, {
                    method: "POST",
                    headers: {
                        Authorization: user_token
                    },
                    body: JSON.stringify({ start_date, end_date })
                });
            } else {
                response = await fetch('/api/dates/chart/weekly/get-all', {
                    method: "POST",
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
        getDatesMonthlyChart: async (user_uuid = null, start_date, end_date) => {
            let response;
            if (typeof user_uuid == "string") {
                response = await fetch(`/api/dates/chart/monthly/${user_uuid}`, {
                    method: "POST",
                    headers: {
                        Authorization: user_token
                    },
                    body: JSON.stringify({ start_date, end_date })
                });
            } else {
                response = await fetch('/api/dates/chart/monthly/get-all', {
                    method: "POST",
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

export default userDateApi