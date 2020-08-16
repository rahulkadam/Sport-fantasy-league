import React from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import './GameCard.styles.scss';
import {Logo} from '..';
import {getTeamLogoByName} from './Game-util';
import Countdown from 'react-countdown';

const GameCard = (cardProps: GameCardProps) => {
  const renderer = ({days, hours, minutes}: {[key: string]: any}) => {
    let msg = '';
    if (days > 0) {
      msg = days + ' Days ';
    }
    if (hours > 0) {
      msg = msg + hours + ' Hrs';
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
                logoSource={getTeamLogoByName(cardProps.team1)}
                width="48"
              />
              {cardProps.team1}
            </Col>
            <Col>{calculateTime(cardProps.time)}</Col>
            <Col>
              <Logo
                logoSource={getTeamLogoByName(cardProps.team2)}
                width="48"
              />
              {cardProps.team2}
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default GameCard;
