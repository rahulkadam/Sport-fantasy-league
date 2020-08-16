import React, {Fragment} from 'react';
import {fantasyLogo} from '@logos/index';
import {Row, Col} from 'react-bootstrap';
import {GameCorousel} from 'common/components';
import {getGameCardPropsData} from '../redux';
const MatchStatsData = (props: HomeData) => {
  const leagueMatchList = props.leagueMatchesList || [];
  const matchScheduleList: GameCardProps[] = getGameCardPropsData(
    leagueMatchList
  );
  const mostScoringPlayerList: PlayerScoreCardProps[] = [
    {
      name: 'Sachin',
      team: 'MI',
      rank: 1,
      score: 456,
      matches: 9,
      id: 123,
    },
    {
      name: 'Kohli',
      team: 'RCB',
      rank: 2,
      score: 256,
      matches: 6,
      id: 13,
    },
  ];
  return (
    <div>
      <Row>
        <Col md={3}>
          <GameCorousel type="schedule" matchScheduleCard={matchScheduleList} />
        </Col>
        <Col md={3}>
          <GameCorousel type="schedule" matchScheduleCard={matchScheduleList} />
        </Col>
        <Col md={3}>
          <GameCorousel type="schedule" matchScheduleCard={matchScheduleList} />
        </Col>
        <Col md={3}>
          <GameCorousel
            type="topplayerscore"
            mostScoringPlayerList={mostScoringPlayerList}
          />
        </Col>
      </Row>
    </div>
  );
};

export default MatchStatsData;
