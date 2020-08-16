import React, {Fragment} from 'react';
import {fantasyLogo} from '@logos/index';
import {Row, Col} from 'react-bootstrap';
import {GameCorousel} from 'common/components';
const MatchStatsData = () => {
  const matchScheduleList: GameCardProps[] = [
    {
      team1: 'CSK',
      team2: 'MI',
      team2logo: fantasyLogo,
      team1logo: fantasyLogo,
      id: 123,
      time: '1h 45Min left',
      venue: 'Banglore',
      tournament: 'IPL20',
    },
    {
      team1: 'PNJ',
      team2: 'MI',
      team2logo: fantasyLogo,
      team1logo: fantasyLogo,
      id: 1234,
      time: '1h 45Min left',
      venue: 'Mumbai',
      tournament: 'IPL20',
    },
  ];
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
