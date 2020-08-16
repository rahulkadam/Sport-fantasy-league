import React from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import './GameCard.styles.scss';
import {Logo} from '..';
import {blackplayer} from '@logos/index';
const PlayerScoreCard = (props: PlayerScoreCardProps) => {
  return (
    <Card className="gamecardcontainer">
      <Card.Body>
        <Card.Title>
          {props.name} , {props.rank}
        </Card.Title>
        <Card.Text>
          <Row>
            <Col>
              <Logo logoSource={blackplayer} width="48" />
              {props.matches} , {props.score}
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default PlayerScoreCard;
