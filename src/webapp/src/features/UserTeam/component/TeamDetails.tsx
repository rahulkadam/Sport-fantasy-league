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
      <Fragment>
        <Row>
          <Col>Name</Col>
          <Col>Total Score</Col>
          <Col>Transfer Available</Col>
          <Col>Transfer used</Col>
        </Row>
        <Row>
          <Col>
            {userteam.name} ({userteam.id})
          </Col>
          <Col>{userteam.total_score}</Col>
          <Col>{userteam.remained_Transfer}</Col>
          <Col>{userteam.used_Transfer}</Col>
        </Row>
        <Row>
          <Col>Status</Col>
          <Col>Balance</Col>
        </Row>
        <Row>
          <Col>{teamEligibleToPlay()}</Col>
          <Col>{userteam.creditbalance}</Col>
        </Row>
      </Fragment>
    );
  }
  function renderTeamDetails() {
    return (
      <UserTeamPlayerDetails title="Your Fantasy Team" data={userPlayerList} />
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
