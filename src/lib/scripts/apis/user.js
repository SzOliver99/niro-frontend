import { wrapFetch } from "./api";
import { Notification } from '$lib/stores/notifications';

const userApi = ({ baseFetch = fetch, user_token = null } = {}) => {
	const fetch = wrapFetch(baseFetch, user_token)

	return {
		// Authentication endpoints
		signIn: async (username, password) => {
			const response = await fetch('/api/user/login/username', {
				method: 'POST',
				body: JSON.stringify({ username, password })
			});
			return await response.json();
		},
		signUp: async (user) => {
			const response = await fetch('/api/user/register', {
				method: 'POST',
				headers: {
					Authorization: user_token
				},
				body: JSON.stringify(user)
			});
			const data = await response.json();
			if (!response.ok) {
				await Promise.reject(Notification.error(data.error, 3));
			}

			return data;
		},
		getUsers: async () => {
			const response = await fetch('/api/user/get-all', {
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
		getUsersByUuid: async (user_uuid) => {
			const response = await fetch(`/api/user/get/${user_uuid}`, {
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
		getManagerGroup: async () => {
			const response = await fetch('/api/user/managers/group', {
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
		getUserInfo: async () => {
			const response = await fetch('/api/user/info', {
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
		modifyUserInfo: async (user, user_uuid) => {
			const response = await fetch(`/api/user/${user_uuid}/info`, {
				method: 'PUT',
				headers: {
					Authorization: user_token
				},
				body: JSON.stringify(user)
			});
			const data = await response.json();
			if (!response.ok) {
				await Promise.reject(Notification.error(data.error, 3));
			}

			return data;
		},
		modifyUserManager: async (user) => {
			const response = await fetch('/api/user/manager', {
				method: 'PUT',
				headers: {
					Authorization: user_token
				},
				body: JSON.stringify(user)
			});
			const data = await response.json();
			if (!response.ok) {
				await Promise.reject(Notification.error(data.error, 3));
			}

			return data;
		},
		deleteUser: async (user_uuid) => {
			const response = await fetch(`/api/user/delete/${user_uuid}`, {
				method: 'DELETE',
				headers: {
					Authorization: user_token
				}
			});

			return response;
		},
		getUserRole: async () => {
			const response = await fetch('/api/user/role', {
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
		getManagers: async (user_uuid = null) => {
			const response = await fetch(`/api/user/managers`, {
				method: "POST",
				headers: {
					Authorization: user_token
				},
				body: JSON.stringify(user_uuid)
			});
			const data = await response.json();
			if (!response.ok) {
				await Promise.reject(Notification.error(data.error, 3));
			}

			return data;
		},
		getUserSubUsers: async (min_role = "Any") => {
			const response = await fetch(`/api/user/sub-users/${min_role}`, {
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
		validateToken: async () => {
			const response = await fetch('/api/user/protected', {
				headers: {
					Authorization: user_token
				}
			});
			return response;
		}
	}
};

export default userApi;
