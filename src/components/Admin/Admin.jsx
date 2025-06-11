import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar/SideBar'
import { FaBars } from 'react-icons/fa'
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
                    <FaBars
                        onClick={() => setCollapsed(!collapsed)}
                    />
                    admin content
                </div>
            </div>
        </>
    )
}

export default Admin