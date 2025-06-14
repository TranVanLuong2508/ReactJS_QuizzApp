import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

instance.interceptors.response.use(
    (response) => {
        // const { data } = response
        return response && response.data ? response.data : response;
    },
    (error) => {
        return error && error.response ? error.response.data : Promise.reject(error)
    }
);

instance.interceptors.request.use(
    (config) => {
        return config
    }
)
export default instance;

