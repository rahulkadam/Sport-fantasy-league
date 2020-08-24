import React from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';
import './GameCard.styles.scss';
import history from 'common/config/history';
import {Logo} from '..';
import {getLogoNameByLeagueName} from '../FantasyDropDown';
import {joinLeagueAction} from '../../../features/frontoffice/league/redux';
import {isUserLogin} from '../../../API';

const LeagueCard = ({data}: LeagueCardProps) => {
  const loginUser = isUserLogin();
  const joinLeague = joinLeagueAction();
  const title = data.publicLeague ? 'Public' : 'Private';
  const logoSource = getLogoNameByLeagueName(data.name);
  return (
    <Card className="gamecardcontainer">
      <Card.Body>
        <Card.Title className="publicLeague">
          {title} League{' '}
          {logoSource && <Logo logoSource={logoSource} width="40" />}
        </Card.Title>
        <Card.Text>
          <Row>
            <Col>{data.name}</Col>
            {!data.publicLeague && <Col>Code : {data.leagueCode}</Col>}
          </Row>
          <Row>
            <Col>Users: {data.totalUserCount || 0}</Col>
            <Col>
              {!data.userRank && loginUser && (
                <Button
                  variant="link"
                  onClick={() => joinLeague(data.leagueCode)}>
                  Join League
                </Button>
              )}
              {data.userRank && <span>Your Rank : {data.userRank}</span>}
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default LeagueCard;
