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
import TwitterFantasyTimeline from 'common/components/Footer/socialmedia/TwitterFantasyTimeline';

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
        <StatusMessage type="info" text="Upcoming Matches" />
        <MatchDetails
          title="Fixtures"
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
    return <TwitterFantasyTimeline type="list" id="1301203927308726272" />;
  }

  return (
    <div className="fixtureContainer">
      <LoadingOverlay
        active={configProps.isLoading}
        spinner
        text="Loading Fixture Details ...">
        <Helmet>
          <title>IPL-20 Fixture</title>
        </Helmet>
        {renderStatusMessage(configProps.hasError, configProps.statusMessage)}
        {renderMatchListView()}
        {renderTwitterHashtag()}
      </LoadingOverlay>
    </div>
  );
};

export default Fixtures;
