import React, {Fragment} from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';
import './GameCard.styles.scss';
import history from 'common/config/history';
import {isUserLogin} from '../../../API';

const CreateSquadCard = () => {
  const loginUser = isUserLogin();
  function renderCreateTeamCard() {
    return (
      <Card className="createSquadcardcontainer">
        <Card.Body>
          <Card.Title className="userTeamTitle">Pick Your Squad</Card.Title>
          <Card.Text>
            <Row>
              <Col>
                Use Credit of 100 to pick a squad of 11 players from the League.
              </Col>
            </Row>
            <Row>
              <Col>Play IPL Fantasy within limited Transfer</Col>
            </Row>
            <Row>
              <Col>
                {loginUser && (
                  <Button
                    variant="outline-primary"
                    onClick={() => history.push('/team')}>
                    Create Team
                  </Button>
                )}
                {!loginUser && (
                  <Button
                    variant="outline-primary"
                    onClick={() => history.push('/login')}>
                    Login and Create Team
                  </Button>
                )}
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return <Fragment>{renderCreateTeamCard()}</Fragment>;
};
export default CreateSquadCard;
