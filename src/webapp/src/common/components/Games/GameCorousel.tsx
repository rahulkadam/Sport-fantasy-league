import React from 'react';
import {Carousel} from 'react-bootstrap';
import {GameCard} from '../index';

const GameCorousel = (props: GameCorouselProps) => {
  const type = props.type;
  const gameCards = props.matchScheduleCard || [];

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

  return (
    <div>
      {type == 'schedule' && renderGamesCard()}
      {type == 'topplayerscore' && renderGamesCard()}
      {type == 'topUserscore' && renderGamesCard()}
      {type == 'toppickedplayer' && renderGamesCard()}
    </div>
  );
};

export default GameCorousel;
