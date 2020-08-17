import React, {useEffect} from 'react';
import {MatchDetails} from '../admin/Match/component';
import {fetchMatchListAction, getMatchData} from '../admin/Match/redux';
import {StatusMessage} from 'common/components';
import LoadingOverlay from 'react-loading-overlay';
import './fixtures.styles.scss';
import {isListEmpty} from 'common/util';

const Fixtures = () => {
  const matchProps = getMatchData();
  const matchList = matchProps.matchList;
  const fetchMatchList = fetchMatchListAction();
  useEffect(() => {
    if (isListEmpty(matchList)) {
      fetchMatchList();
    }
  }, []);

  function renderMatchListView() {
    return (
      <div className="container">
        <MatchDetails title="Fixtures" data={matchList} />
      </div>
    );
  }

  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = matchProps.hasError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }

  return (
    <div>
      <LoadingOverlay active={false} spinner text="Loading League Details ...">
        {renderStatusMessage(matchProps.hasError, matchProps.statusMessage)}
        {renderMatchListView()}
      </LoadingOverlay>
    </div>
  );
};

export default Fixtures;
