import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, Slide } from 'react-toastify';

import App from './App.jsx'
import Admin from './components/Admin/Admin.jsx';
import User from './components/User/User.jsx';
import HomePage from './components/Home/HomePage.jsx';
import ManageUser from './components/Admin/Content/ManageUser.jsx';
import DashBoard from './components/Admin/Content/DashBoard.jsx';
import Login from './components/Auth/Login.jsx';

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='users' element={<User />} />
                </Route>
                <Route path='/admins' element={<Admin />}>
                    <Route path='manage-users' element={<ManageUser />} />
                    <Route index element={<DashBoard />} />
                </Route>
                < Route path='/login' element={<Login />} />
            </Routes>
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
        </>
    )
}

export default Layout