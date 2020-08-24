import React from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';
import './GameCard.styles.scss';
import history from 'common/config/history';

const LeagueCard = ({data}: LeagueCardProps) => {
  return (
    <Card className="gamecardcontainer">
      <Card.Body>
        <Card.Title>Leagues</Card.Title>
        <Card.Text>
          <Row>
            <Col>League : {data.name}</Col>
          </Row>
          <Row>
            <Col>Users: {data.totalUserCount}</Col>
            <Col>
              <Button variant="link" onClick={() => history.push('/league')}>
                Join League
              </Button>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default LeagueCard;
