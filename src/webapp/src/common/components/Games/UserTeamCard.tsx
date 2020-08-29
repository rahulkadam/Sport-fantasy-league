import React, {Fragment} from 'react';
import {Card, Row, Col, Button, Badge} from 'react-bootstrap';
import './GameCard.styles.scss';
import history from 'common/config/history';
import {isUserLogin} from '../../../API';
import {wrapText, wrapTextWithLength} from '../../util';

const UserTeamCard = ({data}: UserTeamCardProps) => {
  const userteam = (data && data.userTeamDTO) || {};
  const loginUser = isUserLogin();

  function renderSuccessBadge(value: any) {
    return <Badge variant="success">{value}</Badge>;
  }

  function renderTeamDetails() {
    return (
      <Card className="gamecardcontainer">
        <Card.Body>
          <Card.Title className="userTeamTitle">
            Team - {wrapTextWithLength(userteam.name, 25)}
          </Card.Title>
          <Card.Text>
            <Row className="CardBoldText">
              <Col xs={4} sm={4} md={2}>
                Score :
              </Col>
              <Col>{renderSuccessBadge(userteam.total_score)}</Col>
              <Col xs={4} sm={4} md={2}>
                Transfer:
              </Col>
              <Col>{renderSuccessBadge(userteam.remained_Transfer)}</Col>
            </Row>
            <Row className="CardBoldText">
              <Col xs={4} sm={4} md={2}>
                Leagues:
              </Col>
              <Col> {renderSuccessBadge(userteam.total_leagues)}</Col>
              <Col xs={4} sm={4} md={2}>
                Credit :
              </Col>
              <Col> {renderSuccessBadge(userteam.creditbalance)}</Col>
            </Row>
            <Row>
              <Col md={{offset: '3'}} xs={{offset: '3'}}>
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
