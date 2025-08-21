// All user API functions are now inside userApi

const userApi = (customFetch = fetch) => ({
	// Authentication endpoints
	signIn: async (svelteFetch = customFetch, username, password) => {
		const response = await svelteFetch('/api/user/sign-in/username', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password })
		});
		return await response.json();
	},

	signUp: async (agentData, userToken) => {
		const response = await customFetch('/api/user/sign-up', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				Authorization: userToken
			},
			body: JSON.stringify(agentData)
		});
		return await response.json();
	},

	// User management endpoints
	getAllUsers: async (userToken) => {
		const response = await customFetch('/api/user/get-all', {
			headers: {
				Authorization: userToken
			}
		});
		return await response.json();
	},

	getManagerGroup: async (userToken) => {
		const response = await customFetch('/api/user/manager/get-all', {
			headers: {
				Authorization: userToken
			}
		});
		return await response.json();
	},

	getUserInfo: async (userToken) => {
		const response = await customFetch('/api/user/info/get', {
			headers: {
				Authorization: userToken
			}
		});
		return await response.json();
	},

	modifyUserInfo: async (userToken, user) => {
		const response = await customFetch('/api/user/info/modify', {
			method: "PUT",
			headers: {
				'Content-Type': 'application/json',
				Authorization: userToken,
			},
			body: JSON.stringify(user)
		});
		return await response.json();
	},

	getUserRole: async (userToken) => {
		const response = await customFetch('/api/user/role/get', {
			headers: {
				Authorization: userToken
			}
		});
		return await response.json();
	},

	completeFirstLogin: async (newPassword, token) => {
		const response = await customFetch('/api/user/first-login/finish', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				new_password: newPassword,
				token
			})
		});
		return await response.json();
	},

	getManagers: async () => {
		const response = await customFetch('/api/user/managers');
		return await response.json();
	},

	validateToken: async (userToken) => {
		const response = await customFetch('/api/user/protected', {
			headers: {
				Authorization: userToken
			}
		});
		return await response.json();
	}
});

export default userApi;