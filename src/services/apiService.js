import axios from '../axios/axiosCustomize'
const apiService = {
    Login: (userEmail, userPassword) => {
        return axios.post('/api/v1/login', {
            email: userEmail,
            password: userPassword,
            delay: 1000
        })
    },

    getQuizByUser: () => {
        return axios.get('/api/v1/quiz-by-participant')
    },

    getQuestionById: (quizId) => {
        return axios.get('/api/v1/questions-by-quiz', {
            params: {
                quizId: quizId
            }
        })
    }
}

export default apiService;
