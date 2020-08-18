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

  return (
    <div>
      <Row>
        <Col md={8}>
          <GameCorousel type="schedule" matchScheduleCard={matchScheduleList} />
        </Col>
      </Row>
    </div>
  );
};

export default MatchStatsData;
