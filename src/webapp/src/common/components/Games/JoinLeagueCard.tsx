import React, {Fragment} from 'react';
import {Card, Row, Col, Image} from 'react-bootstrap';
import './GameCard.styles.scss';
import {leagueListBanner} from '@logos/index';

const JoinLeagueCard = () => {
  function renderJoinLeagueCard() {
    return (
      <Card className="createSquadcardcontainer">
        <Card.Body>
          <Card.Title className="userTeamTitle">Create/Join League</Card.Title>
          <Card.Text>
            <Row>
              <Col className="textFontForCards">
                Join Public League, win Exciting prizes! Or Play Private League
                against friends/family
              </Col>
            </Row>
            <Row>
              <Col>
                <Image src={leagueListBanner} width="100%" height="120px" />
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return <Fragment>{renderJoinLeagueCard()}</Fragment>;
};
export default JoinLeagueCard;
