import React, { Suspense } from 'react'
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
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz.jsx';
import Question from './components/Admin/Content/Quiz/Question/Question.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';

const NotFound = () => {
    return (
        <div className=' alert alert-danger container mt-3 text-center'>
            404. Not found data with your current URL
        </div>
    )
}

const Layout = () => {
    return (
        <Suspense fallback="...is loading">
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='users' element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    } />
                </Route>
                <Route path='/admins' element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                }>
                    <Route path='manage-users' element={<ManageUser />} />
                    <Route path='manage-quizes' element={<ManageQuiz />} />
                    <Route path='manage-questions' element={<Question />} />
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
        </Suspense>
    )
}

export default Layout