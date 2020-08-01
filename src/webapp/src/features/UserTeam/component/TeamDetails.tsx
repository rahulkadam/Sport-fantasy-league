import React, {Fragment} from 'react';
import {UserTeamPlayerDetails} from './UserTeamPlayerDetails';
import {Col, Row, Tab} from 'react-bootstrap';

const TeamDetails = ({data}: TeamDetailsProps) => {
  function renderUserTeamOverview() {
    return (
      <Fragment>
        <Row>
          <Col>Name</Col>
          <Col>Total Score</Col>
          <Col>Transfer</Col>
        </Row>
        <Row>
          <Col>{data.userteam.name}</Col>
          <Col>{data.userteam.id}</Col>
          <Col>{data.userteam.total_score}</Col>
        </Row>
      </Fragment>
    );
  }

  function renderTeamDetails() {
    return (
      <UserTeamPlayerDetails
        title="Your Fantasy Team"
        data={data.userTeamPlayers}
      />
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
