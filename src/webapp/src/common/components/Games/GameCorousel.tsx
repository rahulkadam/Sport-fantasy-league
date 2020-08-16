import React from 'react';
import {Carousel} from 'react-bootstrap';
import {GameCard} from '../index';
import PlayerScoreCard from './PlayerScoreCard';

const GameCorousel = (props: GameCorouselProps) => {
  const type = props.type;
  const gameCards = props.matchScheduleCard || [];
  const mostScoreingPlayerList = props.mostScoringPlayerList || [];

  function renderGamesCard() {
    return (
      <Carousel>
        {gameCards.map(card => {
          return (
            <Carousel.Item key={card.id}>
              <GameCard {...card} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }

  function renderMostScoringPlayersCard() {
    return (
      <Carousel>
        {mostScoreingPlayerList.map(card => {
          return (
            <Carousel.Item key={card.id}>
              <PlayerScoreCard {...card} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }

  return (
    <div>
      {type == 'schedule' && renderGamesCard()}
      {type == 'topplayerscore' && renderMostScoringPlayersCard()}
      {type == 'topUserscore' && renderGamesCard()}
      {type == 'toppickedplayer' && renderGamesCard()}
    </div>
  );
};

export default GameCorousel;
