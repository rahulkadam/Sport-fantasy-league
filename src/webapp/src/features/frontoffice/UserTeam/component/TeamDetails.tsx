import React, {Fragment} from 'react';
import {UserTeamPlayerDetails} from './UserTeamPlayerDetails';
import {Col, Row, Badge} from 'react-bootstrap';
import PlayerTypeCountSummary from '../component/common/PlayerTypeCountSummary';
import {wrapText, wrapTextWithLength} from '../../../../common/util';

const TeamDetails = ({
  data,
  playerStats,
  fetchPlayerHistory,
}: TeamDetailsProps) => {
  const userteam = data.userteam;
  const userPlayerList = data.userTeamPlayers;
  const captainId = userteam.team_captain_player_Id;

  function renderDarkBadge(value: any) {
    return <Badge variant="dark">{value}</Badge>;
  }

  function renderUserTeamOverview() {
    return (
      <div className="teamOverview">
        <Row className="nameColumn">
          <Col md={1} sm={2} xs={2}>
            Name:
          </Col>
          <Col>{renderDarkBadge(wrapTextWithLength(userteam.name, 30))}</Col>
        </Row>
        <Row className="nameColumn">
          <Col>Points</Col>
          <Col>Transfer</Col>
          <Col>Credits</Col>
        </Row>
        <Row>
          <Col>{renderDarkBadge(userteam.total_score)}</Col>
          <Col>{renderDarkBadge(userteam.remained_Transfer)}</Col>
          <Col>{renderDarkBadge(userteam.creditbalance)}</Col>
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
          fetchPlayerHistory={fetchPlayerHistory}
          playerStats={playerStats}
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
