import React from 'react';
import {Card, Row, Col, Button, Image, Badge} from 'react-bootstrap';
import './GameCard.styles.scss';
import history from 'common/config/history';
import {Logo} from '..';
import {getLogoNameByLeagueName} from '../FantasyDropDown';
import {joinLeagueAction} from '../../../features/frontoffice/league/redux';
import {isUserLogin} from '../../../API';
import {fantasyLogo, teamRCB} from '@logos/index';

const LeagueCard = (props: LeagueCardProps) => {
  const data = props.data;
  const userteam = props.userteam;
  const loginUser = isUserLogin();
  const joinLeague = joinLeagueAction();
  const title = !loginUser ? '' : data.publicLeague ? 'Public' : 'Private';
  const logoSource = getLogoNameByLeagueName(data.name);
  return (
    <div>
      <Card className="gamecardcontainer">
        <Card.Body>
          <Card.Title className="publicLeague">
            {title} League{' '}
            {logoSource && <Logo logoSource={logoSource} width="40" />}
          </Card.Title>
          <Card.Text>
            <Row>
              <Col>
                <Row>
                  <Col className="CardBoldText">
                    <Badge variant="success">{data.name}</Badge>
                  </Col>
                  {!data.publicLeague && <Col>Code : {data.leagueCode}</Col>}
                </Row>
                <Row>
                  <Col className="CardBoldText">
                    Playing Users:{' '}
                    <Badge variant="primary">{data.totalUserCount || 0}</Badge>
                  </Col>
                  <Col className="CardBoldText">
                    {!data.userRank && loginUser && userteam && (
                      <Button
                        variant="outline-primary"
                        onClick={() => joinLeague(data.leagueCode)}>
                        Join League
                      </Button>
                    )}
                    {data.userRank && (
                      <span>
                        Your Rank :{' '}
                        <Badge variant="success">{data.userRank}</Badge>
                      </span>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {!userteam && loginUser && (
                      <Button
                        variant="outline-primary"
                        onClick={() => history.push('/team')}>
                        Create Team and Join League
                      </Button>
                    )}
                    {!userteam && !loginUser && (
                      <Button
                        variant="outline-primary"
                        onClick={() => history.push('/login')}>
                        Login and Join League
                      </Button>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col className="d-none d-md-block d-lg-none">
                Join Public League and Play with Sport Community
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default LeagueCard;
