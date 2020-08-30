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

  function successBadge(value: any) {
    return <Badge variant="success">{value}</Badge>;
  }
  return (
    <div>
      <Card className="leaguecardcontainer">
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
                <Row>
                  <Col className="CardBoldText">
                    Playing Users:{' '}
                    <Badge variant="success">{data.totalUserCount || 0}</Badge>
                  </Col>
                  <Col className="CardBoldText">
                    {data.userRank && (
                      <span>
                        Your Rank :
                        <Badge variant="success">{data.userRank}</Badge>
                      </span>
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
