// Authentication endpoints
export async function signIn(svelteFetch = fetch, username, password) {
	return svelteFetch('/api/user/sign-in/username', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, password })
	});
}

export async function signUp(agentData, userToken) {
	return fetch('/api/user/sign-up', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			Authorization: userToken
		},
		body: JSON.stringify(agentData)
	});
}

// User management endpoints
export async function getAllUsers(userToken) {
	return fetch('/api/user/get-all', {
		headers: {
			Authorization: userToken
		}
	});
}

export async function getManagerGroup(userToken) {
	return fetch('/api/user/manager/get-all', {
		headers: {
			Authorization: userToken
		}
	});
}

export async function getUserInfo(userToken) {
	return fetch('/api/user/get/informations', {
		headers: {
			Authorization: userToken
		}
	});
}

export async function checkUserPermissions(userToken) {
	return fetch('/api/user/is-any-permission', {
		headers: {
			Authorization: userToken
		}
	});
}

export async function completeFirstLogin(svelteFetch = fetch, newPassword, token) {
	return svelteFetch('/api/user/first-login/finish', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			new_password: newPassword,
			token
		})
	});
}

export async function getManagers() {
	return fetch('/api/user/managers');
}

export async function validateToken(userToken) {
	return fetch('/api/user/protected', {
		headers: {
			Authorization: userToken
		}
	});
}