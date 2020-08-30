import React, {Fragment} from 'react';
import {Card, Row, Col, Image} from 'react-bootstrap';
import './GameCard.styles.scss';
import {playerListBanner} from '@logos/index';

const CreateSquadCardHelp = () => {
  function renderCreateSquadHelpCard() {
    return (
      <Card className="createSquadcardcontainer">
        <Card.Body>
          <Card.Title className="userTeamTitle">Create Team</Card.Title>
          <Card.Text>
            <Row>
              <Col>
                <Image src={playerListBanner} width="100%" height="120px" />
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return <Fragment>{renderCreateSquadHelpCard()}</Fragment>;
};
export default CreateSquadCardHelp;
