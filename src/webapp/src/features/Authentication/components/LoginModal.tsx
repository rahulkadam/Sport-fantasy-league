import React, {Fragment} from 'react';
import {Button, Modal} from 'react-bootstrap';
import Login from './Login';

const LoginModal = (props1: LoginModalProps) => {
  function renderLoginModal() {
    return (
      <Modal
        show={props1.show}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="mainContainer"
        onHide={() => {
          props1.handleClose(false);
        }}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login />
        </Modal.Body>
        <Button
          onClick={() => {
            props1.handleClose(false);
          }}>
          Cancel
        </Button>
      </Modal>
    );
  }

  return <Fragment>{renderLoginModal()}</Fragment>;
};

export default LoginModal;
