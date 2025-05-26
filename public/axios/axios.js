import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.mangadex.org',
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest"
    },
    withCredentials: false,
    paramsSerializer: params => {
        const searchParams = new URLSearchParams();
        
        // Handle nested objects and arrays
        const addParam = (key, value) => {
            if (Array.isArray(value)) {
                value.forEach(v => searchParams.append(`${key}[]`, v));
            } else if (value && typeof value === 'object') {
                Object.entries(value).forEach(([k, v]) => {
                    addParam(`${key}[${k}]`, v);
                });
            } else {
                searchParams.append(key, value);
            }
        };

        Object.entries(params).forEach(([key, value]) => {
            addParam(key, value);
        });

        return searchParams.toString();
    }
});

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("API Error:", error.response.data);
        } else if (error.request) {
            console.error("Network Error:", error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
