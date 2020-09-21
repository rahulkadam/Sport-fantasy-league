import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import UserTeamView from './UserTeamView';

const UserTeamViewModal = (props: UserTeamViewModalProps) => {
  function renderUserTeamPreviewModal() {
    return (
      <Modal
        show={props.show}
        size="xl"
        centered
        className="mainContainer"
        onHide={() => {
          props.handleClose(false);
        }}>
        <Modal.Header closeButton>
          <Modal.Title>Team Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserTeamView userTeam={props.userTeam} />
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

  return <div>{renderUserTeamPreviewModal()}</div>;
};

export default UserTeamViewModal;
