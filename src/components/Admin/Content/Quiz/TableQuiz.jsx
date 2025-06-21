import React, { useEffect, useState } from 'react'
import ModalUpdateQuiz from './ModalUpdateQuiz'
import ModalDeleteQuiz from './ModalDeleteQuiz'
import apiService from '../../../../services/apiService'

const TableQuiz = (props) => {

    const { listQuiz, fetchListQuiz } = props
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const fetchQuiz = async () => {
        setDataUpdate({});
        setDataDelete({});
        let res = await apiService.getAllQuiz();
        if (res && res.EC === 0) {
            fetchListQuiz(res.DT)
        }
    }

    useEffect(() => {
        fetchQuiz()
    }, [])


    const clickEditButton = (quiz) => {
        setDataUpdate(quiz);
        setIsShowModalUpdate(true);
    }

    const ClickDeleteButton = (quiz) => {
        setDataDelete(quiz);
        setIsShowModalDelete(true);
    }
    return (
        <div className='table-quiz-data mt-5'>
            <table className="table table-striped table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((quiz, index) => {
                        return (
                            <tr key={index}>
                                <td >{quiz.id}</td>
                                <td>{quiz.name}</td>
                                <td>{quiz.description}</td>
                                <td>{quiz.difficulty}</td>
                                <td>
                                    <button
                                        className='btn btn-warning mx-3'
                                        onClick={() => { clickEditButton(quiz) }}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => { ClickDeleteButton(quiz) }}
                                    >Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

                    {listQuiz && listQuiz.length == 0 &&
                        <tr>
                            <td colSpan={'5'} className="text-center">Not Found Data</td>
                        </tr>
                    }
                </tbody>
            </table>
            <ModalUpdateQuiz
                show={isShowModalUpdate}
                setShow={setIsShowModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchListQuiz={fetchListQuiz}
            />
            <ModalDeleteQuiz
                show={isShowModalDelete}
                setShow={setIsShowModalDelete}
                dataDelete={dataDelete}
                fetchListQuiz={fetchListQuiz}
            />
        </div>
    )
}

export default TableQuiz