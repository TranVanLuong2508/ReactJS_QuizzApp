import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar/SideBar'
import { FaBars } from 'react-icons/fa'
import './Admin.scss'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import Language from '../Header/Language'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


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
                        <span
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            <FaBars className='leftside' />
                        </span>
                        <div className='rightside'>
                            <Language />
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                                <NavDropdown.Item
                                    href="#action/3.2"
                                >
                                    Log Out
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                        </div>
                    </div>
                    <div className='admin-main'>
                        <PerfectScrollbar>
                            <Outlet />
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin