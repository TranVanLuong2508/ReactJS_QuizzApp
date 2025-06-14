import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc"
import { adminService } from '../../../services';
import { toast } from 'react-toastify';
import _ from 'lodash'

function ModalUpdateUser(props) {

    const { show, setShow, currentPage, fetchListUserWithPaginate, userEdit, resetUserEdit } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        console.log('use effect')
        if (!_.isEmpty(userEdit)) {
            //update state
            setEmail(userEdit.email);
            setPassword('HARDCODE');
            setUsername(userEdit.username);
            setRole(userEdit.role);
            setImage('');
            if (userEdit.image) {
                setImagePreview(`data:image/jpeg;base64,${userEdit.image}`);
            }
        }
    }, [userEdit])

    const handleClose = () => {
        setShow(false)
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('USER');
        setImage('');
        setImagePreview('');
        resetUserEdit()
    };




    const handleUploadImg = (eventUpload) => {
        if (eventUpload && eventUpload.target.files && eventUpload.target.files[0]) {
            let data = eventUpload.target.files
            let file = data[0]
            if (file) {
                let ImgPreview = URL.createObjectURL(file)
                setImagePreview(ImgPreview)
                setImage(file)
            }
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    const handleSubmitUpdateUser = async () => {

        //validate email
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error('Invalid Email !')
            return
        }


        let res = await adminService.updateUser(userEdit.id, username, role, image)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            handleClose()
            await fetchListUserWithPaginate(currentPage)
        }

        if (res && res.EC !== 0) {
            toast.error(res.EM)
        }
    }

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
                    <Modal.Title>Update User</Modal.Title>
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
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
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
                                type="file"
                                hidden
                                id='input-img'
                                onChange={(eventUpload) => handleUploadImg(eventUpload)}
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
                    <Button
                        variant="primary"
                        onClick={() => handleSubmitUpdateUser()}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;