import React, {Fragment} from 'react';
import {UserTeamPlayerDetails} from './UserTeamPlayerDetails';
import {Col, Row, Badge} from 'react-bootstrap';
import {getPlayerMapByType} from '../redux';
import {PlayerTypeList} from '../../../../common/components/FantasyDropDown';
import PlayerTypeCountSummary from './common/PlayerTypeCountSummary';

const TeamDetails = ({data}: TeamDetailsProps) => {
  const userteam = data.userteam;
  const userPlayerList = data.userTeamPlayers;
  const captainId = userteam.team_captain_player_Id;

  function renderUserTeamOverview() {
    return (
      <div className="teamOverview">
        <Row className="nameColumn">
          <Col>NAME</Col>
          <Col>POINTS</Col>
          <Col>TRANSFER</Col>
          <Col>CREDITS</Col>
        </Row>
        <Row>
          <Col>{userteam.name}</Col>
          <Col>{userteam.total_score}</Col>
          <Col>{userteam.remained_Transfer}</Col>
          <Col>{userteam.creditbalance}</Col>
        </Row>
        <Row className="nameColumn">
          <Col>
            <PlayerTypeCountSummary playerList={userPlayerList} />
          </Col>
        </Row>
      </div>
    );
  }
  function renderTeamDetails() {
    if (userPlayerList.length == 0) return;
    return (
      <Fragment>
        <UserTeamPlayerDetails
          data={userPlayerList}
          key="sda"
          captionId={captainId}
        />
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
