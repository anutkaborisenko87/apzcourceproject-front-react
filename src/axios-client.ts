import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('react_front_access_token')
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const {response} = error;
    if (response.status === 401) {
        localStorage.removeItem('react_front_access_token');
    }
    throw error;
})

export default axiosClient;
