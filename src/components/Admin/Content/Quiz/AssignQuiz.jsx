import React, { useEffect, useState } from 'react'
import apiService from '../../../../services/apiService';
import { adminService } from '../../../../services';
import Select from 'react-select';
import { toast } from 'react-toastify';

const AssignQuiz = () => {


    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchQuiz()
        fetchListUser()
    }, [])

    const fetchQuiz = async () => {
        let res = await apiService.getAllQuiz()
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((quiz) => {
                return {
                    value: quiz.id,
                    label: `${quiz.id} - ${quiz.name}`
                }
            })
            setListQuiz(newQuiz)
        }
    }
    const fetchListUser = async () => {
        let res = await adminService.getAllUser()
        if (res && res.EC === 0) {
            let users = res.DT.map((user) => {
                return {
                    value: user.id,
                    label: `${user.id} - ${user.username} -${user.email}`
                }
            })
            setListUser(users)
        }
    }

    const handleChange = (selectedOption) => {
        setSelectedQuiz(selectedOption)
    };
    const handleChangeUser = (selectedOption) => {
        setSelectedUser(selectedOption)
    };

    const handleAssignQuiz = async () => {
        let res = await adminService.postAssignQuizToUser(selectedQuiz.value, selectedUser.value)
        console.log('check res', res)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }


    return (
        <div className='assign-quiz-container row'>
            <div className='col-6 form-group'>
                <label className='mb-2' htmlFor="">Select Quiz:</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={handleChange}
                    options={listQuiz}
                />
            </div>
            <div className='col-6 form-group'>
                <label className='mb-2' htmlFor="">Select User:</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={handleChangeUser}
                    options={listUser}
                />
            </div>
            <div className='col-6'>
                <button
                    className='btn btn-warning my-3'
                    onClick={() => { handleAssignQuiz() }}
                >
                    Assign
                </button>
            </div>
        </div>
    )
}

export default AssignQuiz