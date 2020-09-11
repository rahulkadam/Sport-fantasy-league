import React from 'react';
import {Card, Row, Col, Button, Badge} from 'react-bootstrap';
import './GameCard.styles.scss';
import history from 'common/config/history';
import {Logo} from '..';
import {getLogoNameByLeagueName} from '../FantasyDropDown';
import {joinLeagueAction} from '../../../features/frontoffice/league/redux';
import {isUserLogin} from '../../../API';
import {wrapTextWithLength} from '../../util';
import {GA_League_Event} from '../../config';

const LeagueCard = (props: LeagueCardProps) => {
  const data = props.data;
  const userteam = props.userteam;
  const loginUser = isUserLogin();
  const joinLeague = joinLeagueAction();
  const title = !loginUser
    ? 'Public'
    : data.publicLeague
    ? 'Public'
    : 'Private';
  const logoSource = getLogoNameByLeagueName(data.name);
  const containerName = loginUser
    ? 'leaguecardcontainerlogin'
    : 'leaguecardcontainerNotLogin';

  function successBadge(value: any) {
    return <Badge variant="success">{value}</Badge>;
  }

  function renderUserRank() {
    const userRank = data.userRank;
    const totalUser = data.totalUserCount;
    const rankBadge =
      totalUser < 3 || totalUser / 2 > userRank ? 'success' : 'danger';
    return <Badge variant={rankBadge}>{data.userRank} </Badge>;
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title className="publicLeague">
            <Row>
              <Col className="publicLeague">
                {' '}
                {title} League{' '}
                {logoSource && <Logo logoSource={logoSource} width="40" />}
              </Col>
            </Row>
          </Card.Title>
          <Card.Text>
            <Row className="bottomMargin">
              <Col>
                <Row>
                  <Col>
                    <Badge variant="success">
                      {wrapTextWithLength(data.name, 18)}
                    </Badge>
                  </Col>
                  {!loginUser && (
                    <Col className="CardBoldText">
                      Playing Users: {successBadge(data.totalUserCount || 0)}
                    </Col>
                  )}
                  {!data.publicLeague && (
                    <Col className="CardBoldText">
                      Code : {successBadge(data.leagueCode)}
                    </Col>
                  )}
                  {!data.userRank && loginUser && userteam && (
                    <Col>
                      <Button
                        variant="link"
                        onClick={() => {
                          GA_League_Event('Join Public League');
                          joinLeague(data.leagueCode);
                        }}>
                        Join League
                      </Button>
                    </Col>
                  )}
                </Row>
                {loginUser && (
                  <Row>
                    <Col className="CardBoldText">
                      Playing Users: {successBadge(data.totalUserCount || 0)}
                    </Col>
                    <Col className="CardBoldText">
                      {data.userRank && (
                        <span>Your Rank :{renderUserRank()}</span>
                      )}
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default LeagueCard;
