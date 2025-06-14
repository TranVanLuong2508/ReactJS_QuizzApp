import React, { useEffect, useState } from 'react'
import { FcPlus } from "react-icons/fc"
import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
import TableUser from './TableUser';
import { adminService } from '../../../services';
import ModalUpdateUser from './ModalUpdateUser';
import ModalViewUser from './ModalViewUser';
import ModalConfirmDeleteUser from './ModalConfirmDeleteUser';
import TableUserPagination from './TableUserPagination';
function ManageUser() {

    const LIMIT_USER = 5

    const [isShowCreateUserModal, setIsShowCreateUserModal] = useState(false);
    const [isShowUpdateUserModal, setIsShowUpdateUserModal] = useState(false)
    const [isShowViewUserModal, setIsShowViewUserModal] = useState(false)
    const [isShowDeleteUserModal, setIsShowDeleteUserModal] = useState(false)
    const [pageCount, setPageCount] = useState(0)
    const [listUser, setListUser] = useState([])
    const [userToEdit, setUserToEdit] = useState({})
    const [userToView, setUserToView] = useState({})
    const [userToDelete, setUserToDelete] = useState({})
    const [currentPage, setCurrentPage] = useState(1)

    const fetchListUser = async () => {
        let response = await adminService.getAllUser()
        if (response && response.EC === 0) {
            setListUser(response.DT)
        }
    }

    const fetchListUserWithPaginate = async (page) => {
        let response = await adminService.getAllUserWithPaginate(page, LIMIT_USER)
        if (response && response.EC === 0) {
            console.log('check res', response.DT)
            setListUser(response.DT.users)
            setPageCount(response.DT.totalPages)
        }
    }

    useEffect(() => {
        fetchListUserWithPaginate(1)
    }, [])

    const handleClickEditUserButton = (user) => {
        setIsShowUpdateUserModal(true)
        setUserToEdit(user)
    }

    const handleClickViewButton = (user) => {
        setIsShowViewUserModal(true)
        setUserToView(user)
    }

    const handleClickDeleteButton = (user) => {
        setIsShowDeleteUserModal(true)
        setUserToDelete(user)
    }

    const resetUserToEdit = () => {
        setUserToEdit({})
    }

    const resetUserToView = () => {
        setUserToView({})
    }

    const resetUserToDelete = () => {
        setUserToEdit({})
    }

    return (
        <div className='manage-user-container'>
            <div className='title'>
                Manage Users
            </div>
            <div className='users-content'>
                <div className='btn-add-new'>
                    <button
                        className='btn btn-primary'
                        onClick={() => setIsShowCreateUserModal(true)}
                    >
                        <FcPlus />Add new users
                    </button>
                </div>
                <div className='table-users-container'>
                    {/* <TableUser
                        listUser={listUser}
                        clickEditButton={handleClickEditUserButton}
                        ClickViewButton={handleClickViewButton}
                        ClickDeleteButton={handleClickDeleteButton}
                    /> */}
                    <TableUserPagination
                        listUser={listUser}
                        clickEditButton={handleClickEditUserButton}
                        ClickViewButton={handleClickViewButton}
                        ClickDeleteButton={handleClickDeleteButton}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={isShowCreateUserModal}
                    setShow={setIsShowCreateUserModal}
                    fetchListUser={fetchListUser}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                />
                <ModalUpdateUser
                    show={isShowUpdateUserModal}
                    setShow={setIsShowUpdateUserModal}
                    userEdit={userToEdit}
                    fetchListUser={fetchListUser}
                    resetUserEdit={resetUserToEdit}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                />
                <ModalViewUser
                    show={isShowViewUserModal}
                    setShow={setIsShowViewUserModal}
                    userToView={userToView}
                    resetUserToView={resetUserToView}
                />
                <ModalConfirmDeleteUser
                    show={isShowDeleteUserModal}
                    setShow={setIsShowDeleteUserModal}
                    userToDelete={userToDelete}
                    fetchListUser={fetchListUser}
                    resetUserToDelete={resetUserToDelete}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                />
            </div>
        </div>
    )
}

export default ManageUser