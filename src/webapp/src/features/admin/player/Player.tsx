import React, {useEffect} from 'react';
import {StatusMessage, TabContainer} from 'common/components';
import {
  PlayerDetails,
  CreatePlayer,
  UpdatePlayer,
  UpdatePlayerExternalId,
} from './component';
import {
  fetchPlayerListAction,
  createPlayerAction,
  getPlayerData,
  addTeamToPlayerAction,
  addExternalIdToPlayerAction,
} from './redux';
import {getTeamData, fetchTeamListAction} from '../SportTeam/redux';
import './Player.styles.scss';

const Player = () => {
  const dataProps = getPlayerData();
  const teamDataProps = getTeamData();
  const fetchPlayerList = fetchPlayerListAction();
  const fetchTeamList = fetchTeamListAction();
  const addTeamToPlayer = addTeamToPlayerAction();
  const updateExternalIDToPlayer = addExternalIdToPlayerAction();
  const createPlayer = createPlayerAction();
  const tabName = 'playeroverview';

  useEffect(() => {
    fetchPlayerList();
  }, []);

  function renderCreatePlayer() {
    return <CreatePlayer createPlayerAction={createPlayer} />;
  }

  function renderUpdatePlayer() {
    return (
      <UpdatePlayer
        addPlayerToTeamAction={addTeamToPlayer}
        teamList={teamDataProps.teamList}
        playerList={dataProps.playerList}
        loadTeamList={fetchTeamList}
      />
    );
  }

  function renderPlayerExternalId() {
    return (
      <UpdatePlayerExternalId
        playerList={dataProps.playerList}
        updateExternalId={updateExternalIDToPlayer}
      />
    );
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
    {
      key: 'updatePlayer',
      title: 'Update Player',
      renderfunction: renderUpdatePlayer(),
    },
    {
      key: 'updateExternalId',
      title: 'Update ExternalId',
      renderfunction: renderPlayerExternalId(),
    },
  ];
  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = dataProps.hasError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }
  return (
    <div className="playerBackcontainer">
      {renderStatusMessage(dataProps.hasError, dataProps.statusMessage)}
      <TabContainer defaultKey={tabName} tabConfig={tabConfig} />
    </div>
  );
};

export default Player;
