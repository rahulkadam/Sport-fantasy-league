import React from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import './GameCard.styles.scss';
import {Logo} from '..';
import {getTeamLogoByName} from './Game-util';
const GameCard = (props: GameCardProps) => {
  return (
    <Card className="gamecardcontainer">
      <Card.Body>
        <Card.Title>
          {props.tournament} , {props.venue}
        </Card.Title>
        <Card.Text>
          <Row>
            <Col>
              <Logo logoSource={getTeamLogoByName(props.team1)} width="48" />
              {props.team1}
            </Col>
            <Col>{props.time}</Col>
            <Col>
              <Logo logoSource={getTeamLogoByName(props.team2)} width="48" />
              {props.team2}
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default GameCard;
