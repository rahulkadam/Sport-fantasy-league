import React, {Fragment} from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';
import './GameCard.styles.scss';

const JoinLeagueCard = () => {
  function renderJoinLeagueCard() {
    return (
      <Card className="createSquadcardcontainer">
        <Card.Body>
          <Card.Title className="userTeamTitle">Create/Join League</Card.Title>
          <Card.Text>
            <Row>
              <Col>Play against friends and family</Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return <Fragment>{renderJoinLeagueCard()}</Fragment>;
};
export default JoinLeagueCard;
