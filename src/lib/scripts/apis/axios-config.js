import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            if (typeof window !== 'undefined') {
                // window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
