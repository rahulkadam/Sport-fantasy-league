import React, {Fragment} from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';
import './GameCard.styles.scss';
import history from 'common/config/history';

const FantasyInfoCard = () => {
  function renderFantasyInfoCard() {
    return (
      <Card className="fantasyHelpcardcontainer">
        <Card.Body>
          <Card.Title className="userTeamTitle">
            Register to Play IPL Fantasy League
          </Card.Title>
          <Card.Text>
            <Row>
              <Col>
                IPL Fantasy is a Fantasy Cricket Game played over internet
                between IPL fans.
                <span className="CardBoldText">
                  Fans act like team owner
                </span>{' '}
                who own team during tournament
              </Col>
            </Row>
            <Row>
              <Col className="CardBoldText">
                It’s FREE to play, Please login and Create Team!
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return <Fragment>{renderFantasyInfoCard()}</Fragment>;
};
export default FantasyInfoCard;
