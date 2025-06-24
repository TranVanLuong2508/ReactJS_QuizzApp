import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { apiService } from '../../services'
import './QuizDetail.scss'
import { useLocation } from 'react-router-dom'
import _ from 'lodash'

import Question from './Question/Question'
import ModalResult from './ModalResult'
import RightContent from './Content/RightContent'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const QuizDetail = () => {
    const params = useParams()
    const location = useLocation()
    const [dataQuiz, setDataQuiz] = useState([])
    const [quesIndex, setQuesIndex] = useState(0)
    const [isShowModalResult, setIsShowModalResult] = useState(false)
    const [resultSubmit, setResultSubmit] = useState({})
    const quizId = params.id

    useEffect(() => {
        fetchQuestionsById()
    }, [quizId])

    const fetchQuestionsById = async () => {
        let res = await apiService.getQuestionById(quizId)
        if (res && res.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
                .groupBy('id')
                .map((value, key) => {
                    let answers = []
                    let questionDescription, image = null
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description
                            image = item.image
                        }
                        item.answers.isSelected = false
                        answers.push(item.answers)
                    })
                    answers = _.orderBy(answers, ['id'], ['asc'])
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()

            setDataQuiz(data)
        }

    }

    const handlePrev = () => {
        if (quesIndex - 1 < 0) return
        setQuesIndex(quesIndex - 1)
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > quesIndex + 1) {
            setQuesIndex(quesIndex + 1)
        }
    }

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            question.answers = question.answers.map((item) => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
        }

        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }
    }

    const handleFinishQuiz = async () => {
        console.log('check data befor submit', dataQuiz)
        let payload = {
            quizId: +quizId,
            answers: []
        }

        let userAnswers = []
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach((question) => {
                let questionId = question.questionId
                let userAnswerId = []

                question.answers.forEach((answer) => {
                    if (answer.isSelected === true) {
                        userAnswerId.push(answer.id)
                    }
                })
                userAnswers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
        }
        console.log('check type', typeof userAnswers[0].questionId)
        console.log('check type', typeof payload.quizId)
        payload.answers = userAnswers
        console.log('final data', payload)
        let submitQuizResult = await apiService.postSunmitQuiz(payload)
        if (submitQuizResult && submitQuizResult.EC === 0) {
            console.log('check sub', submitQuizResult)
            setResultSubmit(submitQuizResult.DT)
            setIsShowModalResult(true)
        } else {
            alert('Something wrongs....')
        }
    }

    return (
        <>
            <Breadcrumb className='quiz-detail-new-header'>
                <NavLink to={'/'} className={'breadcrumb-item'}>Trang chủ</NavLink>
                <NavLink to={'/users'} className={'breadcrumb-item'}>Người dùng</NavLink>
                <Breadcrumb.Item active>Quiz</Breadcrumb.Item>
            </Breadcrumb>
            <div className='detail-quiz-container'>
                <div className='left-content'>
                    <div className='title'>
                        Quiz {quizId}: {location?.state.quizTitle}
                    </div>
                    <div className='q-body'>
                        <img src="" alt="" />
                    </div>
                    <div className='q-content'>
                        <Question
                            handleCheckbox={handleCheckbox}
                            quesIndex={quesIndex}
                            questionData={dataQuiz && dataQuiz.length > 0 ? dataQuiz[quesIndex] : []}
                        />
                    </div>
                    <div className='footer'>
                        <button
                            className='btn btn-secondary'
                            onClick={() => handlePrev()}
                        >
                            Prev
                        </button>
                        <button
                            className='btn btn-primary ml-3'
                            onClick={() => handleNext()}
                        >
                            Next
                        </button>
                        <button
                            className='btn btn-warning ml-3'
                            onClick={() => handleFinishQuiz()}
                        >
                            Finish
                        </button>
                    </div>
                </div>
                <div className='right-content'>
                    <RightContent
                        handleFinishQuiz={handleFinishQuiz}
                        dataQuiz={dataQuiz}
                        setQuesIndex={setQuesIndex}
                    />
                </div>
                <ModalResult
                    show={isShowModalResult}
                    setShow={setIsShowModalResult}
                    resultSubmit={resultSubmit}
                    setResultSubmit={setResultSubmit}
                />
            </div>
        </>

    )
}

export default QuizDetail