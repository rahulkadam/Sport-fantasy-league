import React, {useEffect} from 'react';
import {MatchDetails} from '../admin/Match/component';
import {fetchMatchListAction, getMatchData} from '../admin/Match/redux';
import {StatusMessage} from '../../common/components';
import LoadingOverlay from 'react-loading-overlay';

const Fixtures = () => {
  const matchProps = getMatchData();
  const fetchMatchList = fetchMatchListAction();
  useEffect(() => {
    fetchMatchList();
  }, []);

  function renderMatchListView() {
    return (
      <div>
        <MatchDetails title="Match List" data={matchProps.matchList} />
      </div>
    );
  }

  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = matchProps.hasError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }

  return (
    <div>
      <LoadingOverlay
        active={matchProps.isLoading}
        spinner
        text="Loading League Details ...">
        {renderStatusMessage(matchProps.hasError, matchProps.statusMessage)}
        {renderMatchListView()}
      </LoadingOverlay>
    </div>
  );
};

export default Fixtures;
