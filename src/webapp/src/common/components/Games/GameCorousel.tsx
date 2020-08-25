import React from 'react';
import {Carousel} from 'react-bootstrap';
import {CreateSquadCard, GameCard, JoinLeagueCard, LeagueCard} from '../index';
import PlayerScoreCard from './PlayerScoreCard';

const GameCorousel = (props: GameCorouselProps) => {
  const type = props.type;
  const gameCards = props.matchScheduleCard || [];
  const mostScoreingPlayerList = props.mostScoringPlayerList || [];
  const leagueList = props.leagueList || [];

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

  function renderLeagueRankingCard() {
    return (
      <Carousel>
        {leagueList.map(card => {
          return (
            <Carousel.Item key={card.id}>
              <LeagueCard data={card} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    );
  }

  function renderDashboardFantasyInfoCard() {
    return (
      <Carousel>
        <Carousel.Item>
          <CreateSquadCard />
        </Carousel.Item>
        <Carousel.Item>
          <JoinLeagueCard />
        </Carousel.Item>
      </Carousel>
    );
  }

  return (
    <div>
      {type == 'schedule' && renderGamesCard()}
      {type == 'topplayerscore' && renderMostScoringPlayersCard()}
      {type == 'topUserscore' && renderGamesCard()}
      {type == 'toppickedplayer' && renderGamesCard()}
      {type == 'league' && renderLeagueRankingCard()}
      {type == 'dashboardFantasyinfo' && renderDashboardFantasyInfoCard()}
    </div>
  );
};

export default GameCorousel;
