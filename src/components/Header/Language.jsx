import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
const Language = () => {

    const { i18n } = useTranslation();

    const handleChangeLng = (language) => {
        i18n.changeLanguage(language)
    }
    return (
        <>
            <NavDropdown title={i18n.language === 'vi' ? "Tiếng việt" : "English"} id="basic-nav-dropdown-2" className='language'>
                <NavDropdown.Item onClick={() => handleChangeLng('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLng('vi')}>Việt Nam</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}

export default Language