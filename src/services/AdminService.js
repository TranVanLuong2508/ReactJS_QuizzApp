import axios from '../axios/axiosCustomize'
const AdminService = {

    createNewUser: (email, password, username, role, userImage) => {

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('username', username);
        formData.append('role', role);
        formData.append('userImage', userImage);

        return axios.post('/api/v1/participant', formData)
    },

    getAllUser: () => {
        return axios.get('/api/v1/participant/all')
    },

    getAllUserWithPaginate: (pageInut, limitInput) => {
        return axios.get('/api/v1/participant', {
            params: {
                page: pageInut,
                limit: limitInput
            }
        })
    },

    updateUser: (id, username, role, userImage) => {

        const formData = new FormData();
        formData.append('id', id);
        formData.append('username', username);
        formData.append('role', role);
        formData.append('userImage', userImage);

        return axios.put('/api/v1/participant', formData)
    },

    deleteUser: (user) => {
        return axios.delete('/api/v1/participant', {
            data: {
                id: user.id
            }
        })
    },

    putUpdateQuizForAdmin: (id, name, description, type, image) => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('difficulty', type);
        formData.append('quizImage', image);

        return axios.put('/api/v1/quiz', formData)
    },
    deleteQuizForAdmin: (id) => {
        return axios.delete(`/api/v1/quiz/${id}`)
    },
}

export default AdminService;
