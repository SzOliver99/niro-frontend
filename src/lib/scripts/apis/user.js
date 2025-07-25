import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8080"; // or wherever your backend runs

export async function fetchSignIn(username, password) {
    return axios.post(`${API_BASE}/user/sign-in/username`, {
        username,
        password
    });
}

export async function fetchSignUp(username, password) {
    return fetch("/api/user/sign-in", {
        headers: {
            Authorization: getUserToken()
        }
    });
}

export async function fetchIsAnyPermission(token) {
    return fetch("/api/user/is-any-permission", {
        headers: {
            Authorization: token
        }
    });
}
