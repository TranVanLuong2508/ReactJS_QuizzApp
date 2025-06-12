import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from './components/Admin/Admin.jsx';
import User from './components/User/User.jsx';
import HomePage from './components/Home/HomePage.jsx';
import Child from './components/AdminChild/Child.jsx';
import ManageUser from './components/Admin/Content/ManageUser.jsx';
import DashBoard from './components/Admin/Content/DashBoard.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<HomePage />} />
        <Route path='users' element={<User />} />
      </Route>
      <Route path='/admins' element={<Admin />}>
        <Route path='manage-users' element={<ManageUser />} />
        <Route index element={<DashBoard />} />
      </Route>
    </Routes>
  </BrowserRouter>


)
