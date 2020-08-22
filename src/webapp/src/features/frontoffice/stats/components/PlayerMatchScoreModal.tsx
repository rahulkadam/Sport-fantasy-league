import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import PlayerMatchScoreStats from './PlayerMatchScoreStats';
const PlayerMatchScoreModal = (props: PlayerMatchScoreModal) => {
  function renderModal() {
    return (
      <Modal
        show={props.show}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={props.handleClose}
        className="mainContainer">
        <Modal.Header closeButton>
          <Modal.Title>Player History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PlayerMatchScoreStats data={props.data ? props.data : []} />
        </Modal.Body>
        <Button onClick={props.handleClose}>Close</Button>
      </Modal>
    );
  }
  return <div>{renderModal()}</div>;
};

export default PlayerMatchScoreModal;
