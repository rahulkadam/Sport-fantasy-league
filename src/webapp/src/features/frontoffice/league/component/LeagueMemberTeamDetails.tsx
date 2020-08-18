import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {UserTeamPlayerDetails} from '../../UserTeam/component';

const LeagueMemberTeamDetails = (props: LeagueMemberTeamDetailsProps) => {
  return (
    <Modal
      show={props.show}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserTeamPlayerDetails data={props.playerList} title="Player List" />
      </Modal.Body>
      <Button onClick={props.handleClose}>Close</Button>
    </Modal>
  );
};

export default LeagueMemberTeamDetails;
