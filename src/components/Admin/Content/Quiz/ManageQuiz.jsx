import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import Accordion from 'react-bootstrap/Accordion';

import './ManageQuiz.scss'
import { toast } from 'react-toastify';
import { apiService } from '../../../../services';
import TableQuiz from './TableQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];


const ManageQuiz = () => {

    const [quizType, setQuizType] = useState('');
    const [image, setImage] = useState(null)
    const [quizName, setQuizName] = useState('')
    const [quizDescription, setQuizDescription] = useState('')
    const [listQuiz, setListQuiz] = useState([])

    useEffect(() => {
        fetchListQuiz()
    }, [])

    const fetchListQuiz = async () => {
        let res = await apiService.getAllQuiz()
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    const handleChange = (selectedOption) => {
        console.log('check quiiz type', selectedOption)
        setQuizType(selectedOption.value)
    };

    const handleUploadImg = (eventUp) => {
        if (eventUp && eventUp.target && eventUp.target.files[0]) {
            setImage(eventUp.target.files[0])
        }
    }

    const createNewQuiz = async () => {
        if (!quizName || !quizDescription || !quizType || !image) {
            toast.error('You must fill in all required information !')
            return
        } else {
            let createQuizResult = await apiService.createQuiz(quizName, quizDescription, quizType, image)
            if (createQuizResult && createQuizResult.EC === 0) {
                toast.success(createQuizResult.EM)
                setImage(null)
                setQuizDescription('')
                setQuizName('')
                setQuizType('')
                fetchListQuiz()

            } else {
                toast.error(createQuizResult.EM)
            }
        }
    }

    return (
        <>

            <div className='quiz-container'>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Manage Quizzes</Accordion.Header>
                        <Accordion.Body>
                            <div className="add-new">
                                <fieldset className='border rounded-3 px-3'>
                                    <legend className='float-none w-auto px-3'>Add new quiz</legend>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Your quiz name"
                                            onChange={(event) => setQuizName(event.target.value)}
                                            value={quizName}
                                        />
                                        <label >Name</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Your quiz description"
                                            onChange={(event) => setQuizDescription(event.target.value)}
                                            value={quizDescription}
                                        />
                                        <label >Description</label>
                                    </div>
                                    <div className='my-3'>
                                        <Select
                                            defaultValue={quizType}
                                            onChange={handleChange}
                                            options={options}
                                        />
                                    </div>
                                    <div className="more-actions form-group">
                                        <label className='mb-1'>Upload image</label>
                                        <input
                                            onChange={(eventUpload) => handleUploadImg(eventUpload)}
                                            type="file"
                                            className='form-control' />
                                    </div>
                                    <div className='my-3'>
                                        <button
                                            className='btn btn-primary'
                                            onClick={() => { createNewQuiz() }}
                                        >
                                            Save
                                        </button>
                                    </div>

                                </fieldset>

                            </div>
                            <div className="list-detail">
                                <TableQuiz
                                    listQuiz={listQuiz}
                                    fetchListQuiz={fetchListQuiz}
                                />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
                        <Accordion.Body>
                            <QuizQA />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Assign to Users</Accordion.Header>
                        <Accordion.Body>
                            <AssignQuiz />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </div>
        </>
    )
}

export default ManageQuiz