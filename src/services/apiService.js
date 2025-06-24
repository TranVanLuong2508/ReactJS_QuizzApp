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
    },

    postSunmitQuiz: (data) => {
        console.log('check submit', data)
        return axios.post('/api/v1/quiz-submit', { ...data })
    },

    createQuiz: (quizName, quizDescription, quizType, quizImage) => {

        const quizData = new FormData()
        quizData.append('name', quizName)
        quizData.append('description', quizDescription)
        quizData.append('difficulty', quizType)
        quizData.append('quizImage', quizImage)

        return axios.post('/api/v1/quiz', quizData)
    },

    getAllQuiz: () => {
        return axios.get('/api/v1/quiz/all')
    },

    LogOut: (email, refresh_token) => {
        return axios.post('/api/v1/logout', {
            email, refresh_token
        })
    },

    getOverView: () => {
        return axios.get('/api/v1/overview')
    }


}

export default apiService;
