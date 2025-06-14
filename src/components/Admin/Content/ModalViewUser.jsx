import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc"
import _ from 'lodash'

function ModalViewUser(props) {

    const { show, setShow, userToView, resetUserToView } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        console.log('use effect')
        if (!_.isEmpty(userToView)) {
            //update state
            setEmail(userToView.email);
            setPassword('HARDCODE');
            setUsername(userToView.username);
            setRole(userToView.role);
            if (userToView.image) {
                setImagePreview(`data:image/jpeg;base64,${userToView.image}`);
            }
        }
    }, [userToView])

    const handleClose = () => {
        setShow(false)
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('USER');
        setImagePreview('');
        resetUserToView()
    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                size="lg"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>User Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                disabled
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                disabled
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                disabled
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                disabled
                                className="form-select"
                                onChange={(event) => setRole(event.target.value)}
                                value={role}
                            >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="form-label label-upload" htmlFor='input-img'>
                                <FcPlus />
                                Upload File Image
                            </label>
                            <input
                                disabled
                                type="file"
                                hidden
                                id='input-img'
                            />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {/* <span>Preview Image</span> */}
                            {imagePreview ? (<img src={imagePreview} alt="" />) : (<span>Preview Image</span>)}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewUser;