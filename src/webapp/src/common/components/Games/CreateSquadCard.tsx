import React, {Fragment} from 'react';
import {Card, Row, Col, Button, Container} from 'react-bootstrap';
import './GameCard.styles.scss';
import history from 'common/config/history';
import {isUserLogin} from '../../../API';
import {Logo} from '..';
import {playerABD, playerBumrah, playerVK} from '@logos/index';

const CreateSquadCard = () => {
  const loginUser = isUserLogin();
  function renderCreateTeamCard() {
    return (
      <Card className="createSquadcardcontainer">
        <Card.Body>
          <Card.Title className="userTeamTitle">Pick Your Squad</Card.Title>
          <Card.Text>
            <Container>
              <Row className="justify-content-md-center">
                <Col>
                  <Logo logoSource={playerABD} width="80" />
                </Col>
                <Col>
                  <Logo logoSource={playerVK} width="80" />
                </Col>
                <Col>
                  <Logo logoSource={playerBumrah} width="80" />
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col>
                  Use Credit of{' '}
                  <strong>
                    100 to pick a squad of 11 players and 1 captain
                  </strong>{' '}
                  from the League.{' '}
                  <strong>Play IPL Fantasy with limited Transfer</strong>
                  {loginUser && (
                    <Button
                      variant="link"
                      onClick={() => history.push('/team')}>
                      Create Team
                    </Button>
                  )}
                  {!loginUser && (
                    <Button
                      variant="link"
                      onClick={() => history.push('/login')}>
                      Login and Create Team
                    </Button>
                  )}
                </Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return <Fragment>{renderCreateTeamCard()}</Fragment>;
};
export default CreateSquadCard;
