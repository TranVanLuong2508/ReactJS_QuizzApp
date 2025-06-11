import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from './components/Admin/Admin.jsx';
import User from './components/User/User.jsx';
import HomePage from './components/Home/HomePage.jsx';
import Child from './components/AdminChild/Child.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<HomePage />} />
        <Route path='admins' element={<Admin />} >
          <Route path='detail' element={<Child />} />
        </Route>
        <Route path='users' element={<User />} />
      </Route>
    </Routes>
  </BrowserRouter>


)
