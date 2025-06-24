import React, { useRef } from 'react'
import CountDown from './CountDown'

const RightContent = (props) => {

    const { dataQuiz, handleFinishQuiz, setQuesIndex } = props

    const refDiv = useRef([])

    const onTimeUp = () => {
        handleFinishQuiz()
    }

    const handleClickQuestion = (question, index) => {
        setQuesIndex(index)
        if (refDiv.current) {
            console.log(refDiv)
            refDiv.current.forEach(item => {
                if (item && item.className === "question clicked") {
                    item.className = "question"
                }
            })
        }

        if (question && question.answers.length > 0) {
            let isAnswer = question.answers.find(item => item.isSelected === true)
            if (isAnswer) {
                return
            }
        }

        refDiv.current[index].className = "question clicked"
    }



    const getClassQuestion = (index, question) => {
        if (question && question.answers && question.answers.length > 0) {
            let isAnswer = question.answers.find(item => item.isSelected === true)
            if (isAnswer) {
                return "question selected"
            }
        }
        return "question"
    }

    return (
        <>
            <div className='main-timer'>
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((quiz, idex) => {
                        return (
                            <div
                                className={getClassQuestion(idex, quiz)}
                                key={idex}
                                onClick={() => { handleClickQuestion(quiz, idex) }}
                                ref={element => refDiv.current[idex] = element}
                            >
                                {idex + 1}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default RightContent