import axios from 'axios';
import nProgress from '../utils/nprogress';
import { store } from '../redux/store';

const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

instance.interceptors.response.use(
    (response) => {
        nProgress.done()
        // const { data } = response
        return response && response.data ? response.data : response;
    },
    (error) => {
        nProgress.done()
        //token expired EC===-999
        if (error.response.data && error.response.data.EC === -999) {
            window.location.href = '/login'
        }

        return error && error.response ? error.response.data : Promise.reject(error)
    }
);

instance.interceptors.request.use(
    (config) => {
        const access_token = store?.getState()?.user?.account?.access_token
        config.headers["Authorization"] = `Bearer ${access_token}`
        nProgress.start()
        return config
    }
)
export default instance;

