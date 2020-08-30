import React from 'react';
import {Card, Row, Col, Button, Image, Badge} from 'react-bootstrap';
import './GameCard.styles.scss';
import history from 'common/config/history';
import {Logo} from '..';
import {getLogoNameByLeagueName} from '../FantasyDropDown';
import {joinLeagueAction} from '../../../features/frontoffice/league/redux';
import {isUserLogin} from '../../../API';
import {wrapTextWithLength} from '../../util';

const LeagueCard = (props: LeagueCardProps) => {
  const data = props.data;
  const userteam = props.userteam;
  const loginUser = isUserLogin();
  const joinLeague = joinLeagueAction();
  const title = !loginUser ? '' : data.publicLeague ? 'Public' : 'Private';
  const logoSource = getLogoNameByLeagueName(data.name);
  const containerName = loginUser
    ? 'leaguecardcontainerlogin'
    : 'leaguecardcontainerNotLogin';

  function successBadge(value: any) {
    return <Badge variant="success">{value}</Badge>;
  }
  return (
    <div>
      <Card className={containerName}>
        <Card.Body>
          <Card.Title className="publicLeague">
            {title} League{' '}
            {logoSource && <Logo logoSource={logoSource} width="40" />}
          </Card.Title>
          <Card.Text>
            <Row>
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
                        onClick={() => joinLeague(data.leagueCode)}>
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
                        <span>Your Rank :{successBadge(data.userRank)}</span>
                      )}
                    </Col>
                  </Row>
                )}
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
