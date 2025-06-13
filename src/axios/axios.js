import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

instance.interceptors.response.use(
    (response) => {
        // const { data } = response
        return response.data;
    }
);
export default instance;

