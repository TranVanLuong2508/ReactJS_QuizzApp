import React from 'react'
import _ from 'lodash'

const Question = (props) => {

    const { questionData, quesIndex, handleCheckbox } = props

    const handleCheckboxQuestion = (checkEvent, aId, qId) => {
        console.log('check data check', aId, qId)
        handleCheckbox(aId, qId)
    }

    if (_.isEmpty(questionData)) {
        return (<></>)
    }
    return (
        <>
            {questionData.image ?
                <div className='q-image'>
                    <img src={`data:image/ipeg;base64,${questionData.image}`} alt="" />
                </div>
                :
                <div className='q-image'>
                </div>
            }
            <div className='question'>Question {quesIndex + 1}: {questionData.questionDescription}</div>
            <div className='answer'>
                {questionData.answers && questionData.answers.length > 0 &&
                    questionData.answers.map((answer, index) => {
                        return (
                            <div className='a-child' key={`answer-${index}`}>
                                <div className="form-check">
                                    <input
                                        checked={answer.isSelected}
                                        className="form-check-input"
                                        type="checkbox" value=""
                                        id={`flexCheckChecked-${index}`}
                                        onChange={(event) => { handleCheckboxQuestion(event, answer.id, questionData.questionId) }}
                                    />
                                    <label className="form-check-label" htmlFor={`flexCheckChecked-${index}`}>
                                        {answer.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Question