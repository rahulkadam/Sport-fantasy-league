import React from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';
import './GameCard.styles.scss';
import history from 'common/config/history';

const UserTeamCard = ({data}: UserTeamCardProps) => {
  const userteam = (data && data.userTeamDTO) || {};
  return (
    <Card className="gamecardcontainer">
      <Card.Body>
        <Card.Title>{userteam.name}</Card.Title>
        <Card.Text>
          <Row>
            <Col>Transfer: {userteam.remained_Transfer}</Col>
            <Col>Score : {userteam.total_score}</Col>
          </Row>
          <Row>
            <Col>Leagues: {data.totalLeagueCount}</Col>
            <Col>Credit : {userteam.creditbalance}</Col>
          </Row>
          <Row>
            <Col>
              <Button variant="link" onClick={() => history.push('/transfer')}>
                Change Team
              </Button>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default UserTeamCard;
