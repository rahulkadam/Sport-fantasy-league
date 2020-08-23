import React, {useEffect} from 'react';
import {MatchDetails} from '../../admin/Match/component';
import {StatusMessage} from 'common/components';
import LoadingOverlay from 'react-loading-overlay';
import './fixtures.styles.scss';
import {isListEmpty} from 'common/util';
import {fetchMatchStatsListAction, getStatsProps} from '../stats/redux';
import {fetchUpComingMatchesAction, getHomeData} from '../home/redux';
import {getCommonData} from '../../common/redux';

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
        <StatusMessage type="info" text="Upcoming Match Schedule" />
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

  return (
    <div>
      <LoadingOverlay
        active={configProps.isLoading}
        spinner
        text="Loading Fixture Details ...">
        {renderStatusMessage(configProps.hasError, configProps.statusMessage)}
        {renderMatchListView()}
      </LoadingOverlay>
    </div>
  );
};

export default Fixtures;
