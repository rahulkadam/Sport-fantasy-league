import React, {useEffect} from 'react';
import {StatusMessage, TabContainer} from 'common/components';
import {PlayerDetails, CreatePlayer} from './component';
import {
  fetchPlayerListAction,
  createPlayerAction,
  getPlayerData,
} from './redux';

const Player = () => {
  const dataProps = getPlayerData();
  const fetchPlayerList = fetchPlayerListAction();
  const createPlayer = createPlayerAction();
  const tabName = 'playeroverview';

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchPlayerList();
  }, []);
  useEffect(() => {
    console.log('component will Mount, render everytime');
  });
  function createPlayerFromAdmin(
    name: string,
    country: string,
    type: string,
    value: number
  ) {
    console.log('creating player :', name);
    createPlayer(name, country, value, type);
  }

  function renderCreatePlayer() {
    return <CreatePlayer createPlayerAction={createPlayerFromAdmin} />;
  }

  function renderTeamListView() {
    return (
      <div>
        <PlayerDetails title="Player List" data={dataProps.playerList} />
      </div>
    );
  }

  const tabConfig: TabConfig[] = [
    {
      key: 'playeroverview',
      title: 'Overview',
      renderfunction: renderTeamListView(),
    },
    {
      key: 'createPlayer',
      title: 'Create Player',
      renderfunction: renderCreatePlayer(),
    },
  ];
  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = dataProps.hasError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }
  return (
    <div>
      {renderStatusMessage(dataProps.hasError, dataProps.statusMessage)}
      <TabContainer defaultKey={tabName} tabConfig={tabConfig} />
    </div>
  );
};

export {Player};
