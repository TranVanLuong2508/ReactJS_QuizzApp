import React from 'react'
import { Outlet } from 'react-router-dom'
import VideoHomePage from '../../assets/video-homepage.mp4'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
function HomePage() {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()
    const { t } = useTranslation();
    return (
        <>
            <div className='homepage-container' >
                <video autoPlay loop muted>
                    <source
                        src={VideoHomePage}
                        type='video/mp4'
                    />
                </video>
                <div className='homepage-content'>
                    <div className='title-1'>
                        {/* There's a beter way to ask */}
                        {t('homepage.title1')}
                    </div>
                    <div className='title-2'>
                        {t('homepage.title2')}
                    </div>
                    <div className='title-3'>
                        {isAuthenticated === false ?
                            <button onClick={() => { navigate('/login') }}>Get's started. It's free</button>
                            :
                            <button onClick={() => { navigate('/users') }}>Doing quiz now</button>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage