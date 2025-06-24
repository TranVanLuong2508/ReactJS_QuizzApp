import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc"

function ModalResult(props) {

    const { show, setShow, resultSubmit, setResultSubmit } = props;



    const handleClose = () => {
        setShow(false)
        setResultSubmit({})
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
                    <Modal.Title>Your result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Questions : {resultSubmit.countTotal}</div>
                    <div>Total Correct Answer : {resultSubmit.countCorrect}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Show Answer
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;