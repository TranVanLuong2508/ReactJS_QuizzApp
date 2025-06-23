import React from 'react'
import { Link, Outlet } from "react-router-dom";
import './App.scss'
// import Header from '../src/components/Header'
import Header from './components/Header/Header'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

function App() {
  return (
    <>
      <div className='app-container'>
        <div className='header-container'>
          <Header />
        </div>
        <div className='main-container'>
          <div className='slidenav-container'>

          </div>
          <div className='app-content'>
            <PerfectScrollbar>
              <Outlet />
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
