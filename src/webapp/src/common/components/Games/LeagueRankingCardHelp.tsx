import React, {Fragment} from 'react';
import {Card, Row, Col, Button, Image} from 'react-bootstrap';
import './GameCard.styles.scss';
import history from 'common/config/history';
import {isUserLogin} from '../../../API';
import {leagueListBanner, playerListBanner, rankingblack} from '@logos/index';

const LeagueRankingCardHelp = () => {
  function renderCreateSquadHelpCard() {
    return (
      <Card className="createSquadcardcontainer">
        <Card.Body>
          <Card.Title className="userTeamTitle">
            Ranking With Friends
          </Card.Title>
          <Card.Text>
            <Row>
              <Col md={4}>
                <Image src={rankingblack} width="100%" height="80px" />
              </Col>
              <Col md={6}>Check Ranking with Friends in Private League</Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return <Fragment>{renderCreateSquadHelpCard()}</Fragment>;
};
export default LeagueRankingCardHelp;
