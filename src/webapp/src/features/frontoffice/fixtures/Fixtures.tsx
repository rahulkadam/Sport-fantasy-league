import React, {useEffect} from 'react';
import {MatchDetails} from '../../admin/Match/component';
import {StatusMessage} from 'common/components';
import LoadingOverlay from 'react-loading-overlay';
import './fixtures.styles.scss';
import {isListEmpty} from 'common/util';
import {fetchMatchStatsListAction, getStatsProps} from '../stats/redux';
import {fetchUpComingAllMatchesAction, getHomeData} from '../home/redux';
import {getCommonData} from '../../common/redux';
import Helmet from 'react-helmet';
import {Badge} from 'react-bootstrap';

import {
  TwitterFantasyTimeline,
  TWITTER_LIST_SCHEDULE,
} from 'common/components/Footer/socialmedia';

const Fixtures = () => {
  const homeProps = getHomeData();
  const configProps = getCommonData();
  const matchList = homeProps.leagueAllMatchesList;
  const fetchMatchList = fetchUpComingAllMatchesAction();
  const fetchPlayerStats = fetchMatchStatsListAction();
  const statsProps = getStatsProps();

  useEffect(() => {
    if (isListEmpty(matchList)) {
      fetchMatchList();
    }
  }, []);

  function renderMatchListView() {
    return (
      <div>
        <MatchDetails
          title="Fixture"
          data={matchList}
          fetchMatchHistory={fetchPlayerStats}
          playerStats={statsProps.playerStats}
        />
      </div>
    );
  }

  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = isError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }

  function renderTwitterHashtag() {
    return <TwitterFantasyTimeline type="list" id={TWITTER_LIST_SCHEDULE} />;
  }

  return (
    <div className="fixtureContainer">
      <LoadingOverlay
        active={configProps.isLoading}
        spinner
        text="Loading Fixture Details ...">
        <Helmet>
          <title>IPL-21 Fixture</title>
        </Helmet>
        <div className="fixtureTitle">IPL-21 Fixture</div>
        {renderStatusMessage(configProps.hasError, configProps.statusMessage)}
        <Badge variant="warning">*All Match Time are in IST*</Badge>
        {renderMatchListView()}
        {renderTwitterHashtag()}
      </LoadingOverlay>
    </div>
  );
};

export default Fixtures;
