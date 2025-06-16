import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiService } from '../../services'
import './ListQuiz.scss'

const ListQuiz = () => {

    const [arrQuiz, setArrQuiz] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getQuizData()
    }, [])

    const navigateToDetailPage = (quizId, title) => {
        navigate(`/quiz/${quizId}`,
            {
                state: { quizTitle: title }
            })
    }

    const getQuizData = async () => {
        const res = await apiService.getQuizByUser()
        if (res && res.EC === 0) {
            setArrQuiz(res.DT)
        }
    }
    return (
        <>
            <div className='list-quiz-container container'>
                {arrQuiz && arrQuiz.length > 0 &&
                    arrQuiz.map((quiz, index) => {
                        return (
                            <div key={`${index}-quiz`} className="card" style={{ width: "18rem" }}>
                                <img src={`data:image/ipeg;base64,${quiz.image}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Quiz {index + 1}</h5>
                                    <p className="card-text">{quiz.description}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => { navigateToDetailPage(quiz.id, quiz.description) }}
                                    >
                                        Do Quiz
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }

                {arrQuiz && arrQuiz.length === 0 && (
                    <>
                        <div className=''>You don't have any quiz now !</div>
                    </>
                )}
            </div>

        </>
    )
}

export default ListQuiz