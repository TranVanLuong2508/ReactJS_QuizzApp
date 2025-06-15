import axios from '../axios/axiosCustomize'
const apiService = {
    Login: (userEmail, userPassword) => {
        return axios.post('/api/v1/login', {
            email: userEmail,
            password: userPassword,
            delay: 2000
        })
    }
}

export default apiService;
