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
          <Card.Title className="userTeamTitle">Play IPL fantasy</Card.Title>
          <Card.Text>
            <Row>
              <Col className="textFontForCards">
                <div>
                  <strong>
                    Create one team for the tournament, make transfers every
                    matchday.
                  </strong>
                </div>
                <div>
                  Play IPL fantasy against your friend/family or sport
                  community.
                </div>
                <div>
                  <Badge variant="success">
                    1 Team, 60 matches and 100 Transfer = IPL Fantasy
                  </Badge>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="CardBoldText">
                <Button
                  variant="link"
                  className="textFontForCards"
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
