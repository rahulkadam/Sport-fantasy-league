import React from 'react';
import {Card, Row, Col, Button, Form} from 'react-bootstrap';
import './GameCard.styles.scss';
import {Logo} from '..';
import Countdown from 'react-countdown';
import {getLogoNameByTeam, getShortNameByTeam} from '../FantasyDropDown';
import history from 'common/config/history';

const GameCard = (cardProps: GameCardProps) => {
  const liveMatch = cardProps.status;
  const goto = liveMatch ? '/matchlive' : '/fixtures';
  const renderer = ({days, hours, minutes}: {[key: string]: any}) => {
    if (liveMatch) {
      return <span className="timeMsg">Live Match</span>;
    }
    let msg = '';
    if (days > 0) {
      msg = days + ' Days ';
      return <span className="timeMsg">{msg} left</span>;
    }
    if (hours > 0) {
      msg = hours + ' Hrs ';
    }
    if (days <= 0 && hours <= 0) {
      msg = minutes + ' Mins';
    }
    return <span className="timeMsg">{msg} left</span>;
  };

  function calculateTime(time: any) {
    return <Countdown date={time} daysInHours renderer={renderer} />;
  }

  return (
    <div>
      <Card className="gamecardcontainer">
        <Card.Body>
          <Card.Title>{cardProps.venue_name}</Card.Title>
          <Card.Text>
            <Row>
              <Col>
                <Logo
                  logoSource={getLogoNameByTeam(cardProps.team_host_name)}
                  width="60"
                />
              </Col>
              <Col>{calculateTime(cardProps.matchTime)}</Col>
              <Col>
                <Logo
                  logoSource={getLogoNameByTeam(cardProps.team_away_name)}
                  width="60"
                />
              </Col>
            </Row>
            <Row>
              <Col>{getShortNameByTeam(cardProps.team_host_name)}</Col>
              <Col>
                <Button variant="link" onClick={() => history.push(goto)}>
                  View All
                </Button>
              </Col>
              <Col>{getShortNameByTeam(cardProps.team_away_name)}</Col>
            </Row>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default GameCard;
