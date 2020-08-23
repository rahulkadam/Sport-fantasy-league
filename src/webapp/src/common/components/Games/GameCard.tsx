import React from 'react';
import {Card, Row, Col, Button, Form} from 'react-bootstrap';
import './GameCard.styles.scss';
import {Logo} from '..';
import {getTeamLogoByName} from './Game-util';
import Countdown from 'react-countdown';
import {getLogoNameByTeam, getShortNameByTeam} from '../FantasyDropDown';
import history from 'common/config/history';

const GameCard = (cardProps: GameCardProps) => {
  const renderer = ({days, hours, minutes}: {[key: string]: any}) => {
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
    <Card className="gamecardcontainer">
      <Card.Body>
        <Card.Title>
          {cardProps.tournament} , {cardProps.venue}
        </Card.Title>
        <Card.Text>
          <Row>
            <Col>
              <Logo
                logoSource={getLogoNameByTeam(cardProps.team1)}
                width="48"
              />
            </Col>
            <Col>{calculateTime(cardProps.time)}</Col>
            <Col>
              <Logo
                logoSource={getLogoNameByTeam(cardProps.team2)}
                width="48"
              />
            </Col>
          </Row>
          <Row>
            <Col>{getShortNameByTeam(cardProps.team1)}</Col>
            <Col>
              <Button variant="link" onClick={() => history.push('/fixtures')}>
                View All
              </Button>
            </Col>
            <Col>{getShortNameByTeam(cardProps.team2)}</Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default GameCard;
