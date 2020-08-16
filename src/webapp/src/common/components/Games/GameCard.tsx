import React from 'react';
import {Card} from 'react-bootstrap';
import './GameCard.styles.scss';
const GameCard = (props: GameCardProps) => {
  return (
    <Card className="gamecardcontainer">
      <Card.Body>
        <Card.Title>{props.time}</Card.Title>
        <Card.Text>
          {props.team1} VS {props.team2}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default GameCard;
