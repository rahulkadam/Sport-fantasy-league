import React, {Fragment} from 'react';
import {fantasyLogo} from '@logos/index';
import {Row, Col} from 'react-bootstrap';
import {GameCorousel} from 'common/components';
import {arrayRotate, getGameCardPropsData} from '../redux';
const MatchStatsData = (props: HomeData) => {
  const leagueMatchList = props.leagueMatchesList || [];
  const matchScheduleList: GameCardProps[] = getGameCardPropsData(
    leagueMatchList
  );

  const matchScheduleListRotate1: GameCardProps[] = arrayRotate(
    matchScheduleList
  );

  return (
    <div>
      <Row>
        <Col md={4}>
          <GameCorousel type="schedule" matchScheduleCard={matchScheduleList} />
        </Col>
        <Col md={4}>
          <GameCorousel
            type="schedule"
            matchScheduleCard={matchScheduleListRotate1}
          />
        </Col>
      </Row>
    </div>
  );
};

export default MatchStatsData;
