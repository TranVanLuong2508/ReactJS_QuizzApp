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
import ListQuiz from './components/User/ListQuiz.jsx';
import QuizDetail from './components/User/QuizDetail.jsx';

const NotFound = () => {
    return (
        <div className=' alert alert-danger container mt-3 text-center'>
            404. Not found data with your current URL
        </div>
    )
}

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='users' element={<ListQuiz />} />
                </Route>
                <Route path='/admins' element={<Admin />}>
                    <Route path='manage-users' element={<ManageUser />} />
                    <Route index element={<DashBoard />} />
                </Route>
                < Route path='/login' element={<Login />} />
                < Route path='/quiz/:id' element={<QuizDetail />} />
                < Route path='*' element={<NotFound />} />
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