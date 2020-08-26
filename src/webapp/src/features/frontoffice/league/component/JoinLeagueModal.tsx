import React, {Fragment} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {JoinLeague} from './JoinLeague';

const JoinLeagueModal = (props: JoinLeagueModalProps) => {
  function renderLoginModal() {
    return (
      <Modal
        show={props.show}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="mainContainer"
        onHide={() => {
          props.handleClose(false);
        }}>
        <Modal.Header closeButton>
          <Modal.Title>Join Private League</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JoinLeague data={{joinleague: props.joinLeague}} />
        </Modal.Body>
        <Button
          onClick={() => {
            props.handleClose(false);
          }}>
          Cancel
        </Button>
      </Modal>
    );
  }

  return <Fragment>{renderLoginModal()}</Fragment>;
};

export default JoinLeagueModal;
