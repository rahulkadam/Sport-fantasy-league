import React, {useEffect} from 'react';
import {StatusMessage, TabContainer} from 'common/components';
import {MatchDetails, CreateMatch} from './component';
import {fetchMatchListAction, createMatchAction, getMatchData} from './redux';

const Match = () => {
  const dataProps = getMatchData();
  const fetchMatchList = fetchMatchListAction();
  const createMatch = createMatchAction();
  const tabName = 'matchoverview';

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchMatchList();
  }, []);
  useEffect(() => {
    console.log('component will Mount, render everytime');
  });
  function createMatchFromAdmin(
    name: string,
    country: string,
    type: string,
    value: number
  ) {
    console.log('creating Match :', name);
    createMatch(name, country, value, type);
  }

  function renderCreateMatch() {
    return <CreateMatch createMatchAction={createMatchFromAdmin} />;
  }

  function renderMatchListView() {
    return (
      <div>
        <MatchDetails title="Match List" data={dataProps.matchList} />
      </div>
    );
  }

  const tabConfig: TabConfig[] = [
    {
      key: 'matchoverview',
      title: 'Overview',
      renderfunction: renderMatchListView(),
    },
    {
      key: 'createMatch',
      title: 'Create Match',
      renderfunction: renderCreateMatch(),
    },
  ];
  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = dataProps.hasError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }
  return (
    <div>
      Welcome to Match List with
      {renderStatusMessage(dataProps.hasError, dataProps.statusMessage)}
      <TabContainer defaultKey={tabName} tabConfig={tabConfig} />
    </div>
  );
};

export {Match};
