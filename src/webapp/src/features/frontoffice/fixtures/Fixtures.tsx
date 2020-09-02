import React, {useEffect} from 'react';
import {MatchDetails} from '../../admin/Match/component';
import {StatusMessage} from 'common/components';
import LoadingOverlay from 'react-loading-overlay';
import './fixtures.styles.scss';
import {isListEmpty} from 'common/util';
import {fetchMatchStatsListAction, getStatsProps} from '../stats/redux';
import {fetchUpComingMatchesAction, getHomeData} from '../home/redux';
import {getCommonData} from '../../common/redux';
import Helmet from 'react-helmet';
import TwitterHashtag from '../../../common/components/Footer/socialmedia/TwitterHashtag';

const Fixtures = () => {
  const homeProps = getHomeData();
  const configProps = getCommonData();
  const matchList = homeProps.leagueMatchesList;
  const fetchMatchList = fetchUpComingMatchesAction();
  const fetchPlayerStats = fetchMatchStatsListAction();
  const statsProps = getStatsProps();

  useEffect(() => {
    if (isListEmpty(matchList)) {
      fetchMatchList();
    }
  }, []);

  function renderMatchListView() {
    return (
      <div className="container">
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
    return <TwitterHashtag type="list" id="1301203927308726272" />;
  }

  return (
    <div>
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
