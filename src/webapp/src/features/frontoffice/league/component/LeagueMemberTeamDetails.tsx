import React, {Fragment} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {UserTeamPlayerDetails} from '../../UserTeam/component';
import {isListEmpty} from 'common/util';

const LeagueMemberTeamDetails = (props: LeagueMemberTeamDetailsProps) => {
  if (isListEmpty(props.playerList))
    return (
      <Fragment>
        User Team View disable, please check after match start
      </Fragment>
    );
  return (
    <Modal
      show={props.show}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="mainContainer"
      onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserTeamPlayerDetails
          data={props.playerList}
          captionId={props.captainId}
          title="User Team"
        />
      </Modal.Body>
      <Button onClick={props.handleClose}>Close</Button>
    </Modal>
  );
};

export default LeagueMemberTeamDetails;
