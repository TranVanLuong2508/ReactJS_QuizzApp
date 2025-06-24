import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiService } from '../../services'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { ImSpinner10 } from "react-icons/im";
import './Login.scss'
import userActions from '../../redux/actions/userActions'
import Language from '../Header/Language'


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleLogin = async () => {
        //validate form
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error('Invalid Email !')
            return
        }
        //call api
        setIsLoading(true)
        let loginResponse = await apiService.Login(email, password)
        if (loginResponse && loginResponse.EC === 0) {
            toast.success(loginResponse.EM)
            dispatch(userActions.fetchUserLoginSuccess(loginResponse.DT))
            setIsLoading(false)
            navigate('/')
        }

        if (loginResponse && loginResponse.EC !== 0) {
            toast.error(loginResponse.EM)
            setIsLoading(false)
        }
    }

    const handleKeyDown = (event) => {

        if (event.keyCode === 13 && event.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <div className='login-container'>
            <div className='header'>
                <span>Don't have a account yet?</span>
                <button
                // onClick={() => { dispatch(increment()) }}
                >Sign up</button>
                <Language />
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
                        onKeyDown={(event) => { handleKeyDown(event) }}
                    />
                </div>
                <span>Forgot password ?</span>
                <div>
                    <button
                        disabled={isLoading}
                        className=''
                        onClick={() => { handleLogin() }}
                    >
                        {isLoading && <ImSpinner10 className='loadIcon' />}
                        <span>Login</span>
                    </button>
                </div>
                <div className='text-center'>
                    <span
                        onClick={() => { navigate('/') }}
                    >
                        &#60;&#60;Go to HomePage
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login