import apiClient from './axios-config.js';

// Authentication endpoints
export async function signIn(username, password) {
	return apiClient.post('/user/sign-in/username', {
		username,
		password
	});
}

export async function signUp(agentData, userToken) {
	return apiClient.post('/user/sign-up', agentData, {
		headers: {
			Authorization: userToken
		}
	});
}

// User management endpoints
export async function getAllUsers(userToken) {
	return apiClient.get('/user/get-all', {
		headers: {
			Authorization: userToken
		}
	});
}

export async function getUserInfo(userToken) {
	return apiClient.get('/user/get/informations', {
		headers: {
			Authorization: userToken
		}
	});
}

export async function checkUserPermissions(userToken) {
	return apiClient.get('/user/is-any-permission', {
		headers: {
			Authorization: userToken
		}
	});
}

export async function completeFirstLogin(newPassword, token) {
	return apiClient.post('/user/first-login/finish', {
		new_password: newPassword,
		token
	});
}

export async function validateToken(userToken) {
	return apiClient.get('/user/protected', {
		headers: {
			Authorization: userToken
		}
	});
}

// Legacy function names for backward compatibility
export const fetchSignIn = signIn;
export const fetchSignUp = signUp;
export const fetchGetAllUser = getAllUsers;
export const fetchGetUserInformations = getUserInfo;
export const fetchIsAnyPermission = checkUserPermissions;
export const fetchFinishFirstLogin = completeFirstLogin;
export const fetchProtected = validateToken;
