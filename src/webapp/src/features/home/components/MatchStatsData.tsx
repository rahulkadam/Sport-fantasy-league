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
    },
    {
      team1: 'CSK1111',
      team2: 'MI',
      team2logo: fantasyLogo,
      team1logo: fantasyLogo,
      id: 1234,
    },
  ];
  const MostPickedList: GameCardProps[] = [
    {
      team1: 'CSK',
      team2: 'MI',
      team2logo: fantasyLogo,
      team1logo: fantasyLogo,
      id: 123,
    },
    {
      team1: 'CSK1111',
      team2: 'MI',
      team2logo: fantasyLogo,
      team1logo: fantasyLogo,
      id: 1234,
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
            type="toppickedplayer"
            matchScheduleCard={MostPickedList}
          />
        </Col>
      </Row>
    </div>
  );
};

export default MatchStatsData;
