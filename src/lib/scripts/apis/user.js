import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'; // or wherever your backend runs

export async function fetchSignIn(username, password) {
	return axios.post(`${API_BASE}/user/sign-in/username`, {
		username,
		password
	});
}

export async function fetchSignUp(agent, token) {
	return axios.post(`${API_BASE}/user/sign-up`, agent, {
		headers: {
			Authorization: token
		}
	});
}

export async function fetchGetAllUser(token) {
	return axios.get(`${API_BASE}/user/get-all`, {
		headers: {
			Authorization: token
		}
	});
}

export async function fetchIsAnyPermission(token) {
	return axios.get(`${API_BASE}/user/is-any-permission`, {
		headers: {
			Authorization: token
		}
	});
}

export async function fetchProtected(token) {
	return axios.get(`${API_BASE}/user/protected`, {
		headers: {
			Authorization: token
		}
	});
}
