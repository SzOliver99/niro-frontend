import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'; // or wherever your backend runs

export async function fetchSignIn(username, password) {
	return axios.post(`${API_BASE}/user/sign-in/username`, {
		username,
		password
	});
}

export async function fetchSignUp(agent, user_token) {
	return axios.post(`${API_BASE}/user/sign-up`, agent, {
		headers: {
			Authorization: user_token
		}
	});
}

export async function fetchGetAllUser(user_token) {
	return axios.get(`${API_BASE}/user/get-all`, {
		headers: {
			Authorization: user_token
		}
	});
}

export async function fetchGetUserInformations(user_token) {
	return axios.get(`${API_BASE}/user/get/informations`, {
		headers: {
			Authorization: user_token
		}
	});
}


export async function fetchIsAnyPermission(user_token) {
	return axios.get(`${API_BASE}/user/is-any-permission`, {
		headers: {
			Authorization: user_token
		}
	});
}

export async function fetchFinishFirstLogin(new_password, token) {
	return axios.post(`${API_BASE}/user/first-login/finish`, { new_password, token });
}

export async function fetchProtected(user_token) {
	return axios.get(`${API_BASE}/user/protected`, {
		headers: {
			Authorization: user_token
		}
	});
}
