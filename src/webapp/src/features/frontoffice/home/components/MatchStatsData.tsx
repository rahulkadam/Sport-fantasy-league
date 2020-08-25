import React, {Fragment} from 'react';
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
        <Col>
          <GameCorousel type="schedule" matchScheduleCard={matchScheduleList} />
        </Col>
      </Row>
    </div>
  );
};

export default MatchStatsData;
