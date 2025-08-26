// All user API functions are now inside userApi

import { Notification } from '$lib/stores/notifications';

const userApi = (customFetch = fetch) => ({
	// Authentication endpoints
	signIn: async (username, password) => {
		const response = await customFetch('/api/user/login/username', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});
		return await response.json();
	},

	signUp: async (user_token, user) => {
		const response = await customFetch('/api/user/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
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
	getAllUsers: async (user_token) => {
		const response = await customFetch('/api/user/all', {
			headers: {
				Authorization: user_token
			}
		});
		return await response.json();
	},

	getManagerGroup: async (user_token) => {
		const response = await customFetch('/api/user/managers/group', {
			headers: {
				Authorization: user_token
			}
		});
		return await response.json();
	},

	getUserInfo: async (user_token) => {
		const response = await customFetch('/api/user/info', {
			headers: {
				Authorization: user_token
			}
		});
		return await response.json();
	},

	modifyUserInfo: async (user_token, user) => {
		const response = await customFetch('/api/user/info', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
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

	modifyUserManager: async (user_token, user) => {
		const response = await customFetch('/api/user/manager', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
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

	terminateUserContact: async (user_token, user_id) => {
		const response = await customFetch('/api/user/delete', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: user_token
			},
			body: JSON.stringify(user_id)
		});

		return response;
	},

	getUserRole: async (user_token) => {
		const response = await customFetch('/api/user/role', {
			headers: {
				Authorization: user_token
			}
		});
		return await response.json();
	},

	completeFirstLogin: async (new_password, token) => {
		const response = await customFetch('/api/user/first-login/complete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				new_password,
				token
			})
		});
		return await response.json();
	},

	getManagers: async (user_id = 0) => {
		const response = await customFetch('/api/user/managers/list', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user_id)
		});
		return await response.json();
	},

	getUserSubUsers: async (user_token) => {
		const response = await customFetch('/api/user/sub-users', {
			headers: {
				Authorization: user_token
			}
		});
		return await response.json();
	},

	validateToken: async (user_token) => {
		const response = await customFetch('/api/user/protected', {
			headers: {
				Authorization: user_token
			}
		});
		return await response.json();
	}
});

export default userApi;
