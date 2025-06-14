import React, { useState } from 'react'
import './Login.scss'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = () => [

    ]
    return (
        <div className='login-container'>
            <div className='header'>
                Don't have a account yet?
            </div>
            <div className='title col-4 mx-auto'>
                QUIZZ APP
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label >Email</label>
                    <input
                        type="email"
                        className='form-control'
                        placeholder='example@gmail.com'
                        value={email}
                        onChange={(eventInput) => setEmail(eventInput.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label >Password</label>
                    <input
                        type="password"
                        className='form-control'
                        placeholder='Your password'
                        value={password}
                        onChange={(eventInput) => setPassword(eventInput.target.value)}
                    />
                </div>
                <span>Forgot password ?</span>
                <div>
                    <button
                        className=''
                        onClick={() => { handleLogin() }}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login