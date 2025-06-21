import React, { useState } from 'react'
import Select from 'react-select';
import { BsFillPatchPlusFill } from 'react-icons/bs'
import { BsPatchMinusFill } from 'react-icons/bs'
import { RiImageAddFill } from 'react-icons/ri'
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'

import './Question.scss'
const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const Question = () => {

    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                },
            ]
        },
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                },

            ]
        },
    ])

    const handleAddRemoveQuestion = (type, id) => {
        console.log('check', type, id)
        if (type === 'ADD') {
            const newQuestion =
            {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    },
                ]
            }
            setQuestions([...questions, newQuestion])
        }

        if (type === 'REMOVE') {
            let questionsClone = _.cloneDeep(questions)
            questionsClone = questionsClone.filter(item => item.id !== id)
            setQuestions(questionsClone)
        }
    }
    const handleAddRemoveAnswer = (type, quesId, ansId) => {
        let questionsClone = _.cloneDeep(questions)
        if (type === 'ADD_ANS') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionsClone.findIndex(item => item.id === quesId)
            questionsClone[index].answers.push(newAnswer)
            setQuestions(questionsClone)
        }
        if (type === 'REMOVE_ANS') {
            let index = questionsClone.findIndex(item => item.id === quesId)
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== ansId)
            setQuestions(questionsClone)
        }
    }

    const handleChange = (selectedOption) => {
        setSelectedQuiz(selectedOption)
    };

    const handleChangeAnswer = (type, quesId, ansId, event) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === quesId)
        if (index > -1) {
            questionsClone[index].answers = questionsClone[index].answers.map((answer) => {
                if (answer.id === ansId) {
                    if (type === 'CHECK_BOX') {
                        answer.isCorrect = event.target.checked
                    }

                    if (type === "TYPE") {
                        answer.description = event.target.value
                    }
                }
                return answer
            })
            setQuestions(questionsClone)
        }
    }

    const handleChangeQuesDes = (type, quesId, event) => {
        if (type === "QUESTION") {
            let questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(item => item.id === quesId)
            if (index > -1) {
                questionsClone[index].description = event.target.value
                setQuestions(questionsClone)
            }
        }
    }

    const handleOnChangeImgQuestion = (quesId, event) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === quesId)
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            console.log('index', index)
            questionsClone[index].imageFile = event.target.files[0]
            questionsClone[index].imageName = event.target.files[0].name
            setQuestions(questionsClone)
        }
    }

    const handleSubmitQuestionForQuiz = () => {
        console.log('question', questions)

    }

    return (
        <div className='questions-container'>
            <div className='title'>
                Manage-question
            </div>
            <hr />
            <div className='add-new-question'>
                <div className='col-6 form-group'>
                    <label className='mb-2' htmlFor="">Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={handleChange}
                        options={options}
                    />
                </div>
            </div>
            <div className='mt-3 mb-2'>
                Add Question:
            </div>
            {questions && questions.length > 0
                && questions.map((ques, index) => {
                    return (
                        <div className='q-main mb-4' key={ques.id}>
                            <div className='question-content'>
                                <div className="form-floating description ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={ques.description}
                                        onChange={(e) => { handleChangeQuesDes("QUESTION", ques.id, e) }}
                                    />
                                    <label >Question {index + 1}'s Description</label>
                                </div>
                                <div className='group-upload'>
                                    <label className='label-up' htmlFor={`imgInput-${ques.id}`}><RiImageAddFill /></label>
                                    <input
                                        type="file"
                                        hidden
                                        id={`imgInput-${ques.id}`}
                                        onChange={(e) => { handleOnChangeImgQuestion(ques.id, e) }}
                                    />
                                    <span className='uploaded-file-name'>{ques.imageName ? ques.imageName : '0 file is uploaded'}</span>
                                </div>
                                <div className="btn-add">
                                    <span>
                                        < BsFillPatchPlusFill
                                            onClick={() => { handleAddRemoveQuestion("ADD", '') }}
                                            className='icon-add'
                                        />
                                    </span>
                                    {questions.length > 1 &&
                                        (<span>
                                            < BsPatchMinusFill
                                                onClick={() => { handleAddRemoveQuestion("REMOVE", ques.id) }}
                                                className='icon-remove'
                                            />
                                        </span>)
                                    }

                                </div>

                            </div>
                            {ques.answers && ques.answers.length > 0
                                && ques.answers.map((ans, index) => {
                                    return (
                                        <div className="answers-content" key={ans.id}>
                                            <input
                                                className="form-check-input isCorrect"
                                                type="checkbox" value={ans.isCorrect}
                                                onChange={(event) => { handleChangeAnswer("CHECK_BOX", ques.id, ans.id, event) }}
                                            />
                                            <div className="form-floating answer-name ">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={ans.description}
                                                    onChange={(event) => { handleChangeAnswer("TYPE", ques.id, ans.id, event) }}
                                                />
                                                <label >Answer {index + 1}:</label>
                                            </div>
                                            <div className="btn-group">
                                                <span>
                                                    < BsFillPatchPlusFill
                                                        onClick={() => { handleAddRemoveAnswer('ADD_ANS', ques.id) }}
                                                        className='icon-add'
                                                    />
                                                </span>
                                                {ques.answers.length > 1 && (
                                                    <span>
                                                        < BsPatchMinusFill
                                                            onClick={() => { handleAddRemoveAnswer('REMOVE_ANS', ques.id, ans.id) }}
                                                            className='icon-remove'
                                                        />
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
            {questions && questions.length > 0 &&
                <div>
                    <button
                        onClick={() => { handleSubmitQuestionForQuiz() }}
                        className='btn btn-warning'
                    >
                        Save Questions
                    </button>
                </div>
            }

        </div>
    )
}

export default Question


//  <div className="answer">
//                     <input type="text" />
//                 </div>