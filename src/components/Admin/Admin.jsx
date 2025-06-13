import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar/SideBar'
import { FaBars } from 'react-icons/fa'
import { ToastContainer, Slide } from 'react-toastify';
import './Admin.scss'

function Admin() {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <>
            <div className='admin-container'>
                <div className='admin-sidebar'>
                    <SideBar collapsed={collapsed} />
                </div>
                <div className='admin-content'>
                    <div className='admin-header'>
                        <FaBars
                            onClick={() => setCollapsed(!collapsed)}
                        />
                    </div>
                    <div className='admin-main'>
                        <Outlet />
                    </div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Slide}
                />
            </div>
        </>
    )
}

export default Admin