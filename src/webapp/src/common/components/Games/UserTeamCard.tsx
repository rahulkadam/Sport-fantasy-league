import React, {Fragment} from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';
import './GameCard.styles.scss';
import history from 'common/config/history';
import {isUserLogin} from '../../../API';

const UserTeamCard = ({data}: UserTeamCardProps) => {
  const userteam = (data && data.userTeamDTO) || {};
  const loginUser = isUserLogin();
  function renderTeamDetails() {
    return (
      <Card className="gamecardcontainer">
        <Card.Body>
          <Card.Title className="userTeamTitle">
            Team - {userteam.name}
          </Card.Title>
          <Card.Text>
            <Row>
              <Col>Score : {userteam.total_score}</Col>
              <Col>Transfer: {userteam.remained_Transfer}</Col>
            </Row>
            <Row>
              <Col>Leagues: {userteam.total_leagues}</Col>
              <Col>Credit : {userteam.creditbalance}</Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="link"
                  onClick={() => history.push('/team/transfer')}>
                  Change Team
                </Button>
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  function renderCreateTeamCard() {
    return (
      <Card className="gamecardcontainer">
        <Card.Body>
          <Card.Title className="userTeamTitle">Pick Your Squad</Card.Title>
          <Card.Text>
            <Row>
              <Col>
                Use Credit of 100 to pick a squad of 11 players from the Squad.
              </Col>
            </Row>
            <Row>
              <Col>Create and Join Leagues</Col>
            </Row>
            <Row>
              <Col>
                <Button variant="link" onClick={() => history.push('/team')}>
                  Create Team
                </Button>
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Fragment>
      {userteam.name && renderTeamDetails()}
      {!userteam.name && renderCreateTeamCard()}
    </Fragment>
  );
};
export default UserTeamCard;
