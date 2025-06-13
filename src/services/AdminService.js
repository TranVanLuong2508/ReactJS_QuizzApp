import axios from '../axios/axios'
const AdminService = {

    createNewUser: (data) => {
        return axios.post('/api/v1/participant', data)
    }
}

export default AdminService;
