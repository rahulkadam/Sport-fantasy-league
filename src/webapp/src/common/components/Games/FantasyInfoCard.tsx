import React, {Fragment} from 'react';
import {Card, Row, Col, Button, Badge} from 'react-bootstrap';
import './GameCard.styles.scss';
import history from 'common/config/history';
import {isUserLogin} from 'API';

const FantasyInfoCard = () => {
  const loginUser = isUserLogin();

  function renderFantasyInfoCard() {
    return (
      <Card className="fantasyHelpcardcontainer">
        <Card.Body>
          <Card.Title className="userTeamTitle">
            {!loginUser && <span className="userTeamTitle">Register to</span>}{' '}
            Play IPL Season Fantasy League
          </Card.Title>
          <Card.Text>
            <Row>
              <Col className="textFont">
                <strong>Season-Long Fantasy Cricket</strong> played between IPL
                fans for Full IPL with{' '}
                <strong>Single Team and limited Transfer.</strong>
                <Badge variant="success">
                  1 Team, 60 matches and 100 Transfer = IPL Season Fantasy
                </Badge>
              </Col>
            </Row>
            <Row>
              <Col className="CardBoldText">
                It’s FREE to play,{' '}
                <Button
                  variant="link"
                  className="textFont"
                  onClick={() =>
                    loginUser ? history.push('/team') : history.push('/login')
                  }>
                  {!loginUser && 'Login and '}
                  Create Team
                </Button>
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
