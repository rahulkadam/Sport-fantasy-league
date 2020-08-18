import React, {Fragment} from 'react';
import {UserTeamPlayerDetails} from './UserTeamPlayerDetails';
import {Col, Row, Badge} from 'react-bootstrap';

const TeamDetails = ({data}: TeamDetailsProps) => {
  const userteam = data.userteam;
  const userPlayerList = data.userTeamPlayers;

  function teamEligibleToPlay() {
    if (userPlayerList && userPlayerList.length == 11) {
      return (
        <Badge pill variant="success">
          COMPLETE
        </Badge>
      );
    }
    return (
      <Badge pill variant="danger">
        INCOMPLETE
      </Badge>
    );
  }

  function renderUserTeamOverview() {
    return (
      <div className="teamOverview">
        <Row className="nameColumn">
          <Col>Name</Col>
          <Col>Total Score</Col>
          <Col>Status</Col>
        </Row>
        <Row>
          <Col>
            {userteam.name} ({userteam.id})
          </Col>
          <Col>{userteam.total_score}</Col>
          <Col>{teamEligibleToPlay()}</Col>
        </Row>
        <Row className="nameColumn">
          <Col>Transfer Available</Col>
          <Col>Transfer used</Col>
          <Col>Balance</Col>
        </Row>
        <Row>
          <Col>{userteam.remained_Transfer}</Col>
          <Col>{userteam.used_Transfer}</Col>
          <Col>{userteam.creditbalance}</Col>
        </Row>
      </div>
    );
  }
  function renderTeamDetails() {
    return (
      <Fragment>
        {userPlayerList.length > 0 && (
          <UserTeamPlayerDetails
            title="Your Fantasy Team"
            data={userPlayerList}
          />
        )}
        {userPlayerList.length == 0 && (
          <div>Please click on Manager Transfer, to Add player first Time</div>
        )}
      </Fragment>
    );
  }
  return (
    <div>
      {renderUserTeamOverview()}
      {renderTeamDetails()}
    </div>
  );
};

export {TeamDetails};
