import { wrapFetch } from "./api";
import { Notification } from '$lib/stores/notifications';

const userApi = ({ baseFetch = fetch, user_token = null }) => {
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
				Notification.error(data.error, 3);
				throw Error(data.error);
			}

			return data;
		},

		// User management endpoints
		getAllUsers: async () => {
			const response = await fetch('/api/user/all', {
				headers: {
					Authorization: user_token
				}
			});
			return await response.json();
		},

		getManagerGroup: async () => {
			const response = await fetch('/api/user/managers/group', {
				headers: {
					Authorization: user_token
				}
			});
			return await response.json();
		},

		getUserInfo: async () => {
			const response = await fetch('/api/user/info', {
				headers: {
					Authorization: user_token
				}
			});
			return await response.json();
		},

		modifyUserInfo: async (user) => {
			const response = await fetch('/api/user/info', {
				method: 'PUT',
				headers: {
					Authorization: user_token
				},
				body: JSON.stringify(user)
			});
			const data = await response.json();
			if (!response.ok) {
				Notification.error(data.error, 3);
				throw Error(data.error);
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
				Notification.error(data.error, 3);
				throw Error(data.error);
			}

			return data;
		},

		terminateUserContact: async (user_id) => {
			const response = await fetch('/api/user/delete', {
				method: 'DELETE',
				headers: {
					Authorization: user_token
				},
				body: JSON.stringify(user_id)
			});

			return response;
		},

		getUserRole: async () => {
			const response = await fetch('/api/user/role', {
				headers: {
					Authorization: user_token
				}
			});
			return await response.json();
		},

		completeFirstLogin: async (new_password, token) => {
			const response = await fetch('/api/user/first-login/complete', {
				method: 'POST',
				body: JSON.stringify({
					new_password,
					token
				})
			});
			return await response.json();
		},

		getManagers: async (user_id = 0) => {
			const response = await fetch('/api/user/managers/list', {
				method: 'POST',
				body: JSON.stringify(user_id)
			});
			return await response.json();
		},

		getUserSubUsers: async () => {
			const response = await fetch('/api/user/sub-users', {
				headers: {
					Authorization: user_token
				}
			});
			return await response.json();
		},

		validateToken: async () => {
			const response = await fetch('/api/user/protected', {
				headers: {
					Authorization: user_token
				}
			});
			return await response.json();
		}
	}
};

export default userApi;
