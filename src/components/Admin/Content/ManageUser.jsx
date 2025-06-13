import React, { useState } from 'react'
import { FcPlus } from "react-icons/fc"
import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
function ManageUser() {

    const [isShowCreateUserModal, setIsShowCreateUserModal] = useState(false);

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
                    table user
                </div>
                <ModalCreateUser
                    show={isShowCreateUserModal}
                    setShow={setIsShowCreateUserModal}
                />
            </div>
        </div>
    )
}

export default ManageUser