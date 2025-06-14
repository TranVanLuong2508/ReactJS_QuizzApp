import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc"
import { adminService } from '../../../services';
import { toast } from 'react-toastify';

function ModalConfirmDeleteUser(props) {

    const { show, setShow, userToDelete, resetUserToDelete, setCurrentPage, fetchListUserWithPaginate } = props;


    const handleClose = () => {
        setShow(false)
        resetUserToDelete()
    };

    const handleDeleteUser = async (userToDelete) => {
        let res = await adminService.deleteUser(userToDelete)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            handleClose()
            // await fetchListUser()
            setCurrentPage(1)
            await fetchListUserWithPaginate(1)
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
                    <Modal.Title>Confirm Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the account <b>{userToDelete.email}</b>? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => { handleDeleteUser(userToDelete) }}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirmDeleteUser;