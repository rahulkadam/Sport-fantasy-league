import React, {Fragment, useEffect} from 'react';
import {StatusMessage, TabContainer} from 'common/components';
import {UserTeamPlayerDetails, TeamDetails, CreateTeam} from './component';
import {
  fetchAllPlayerListAction,
  getUserTeamData,
  fetchPlayerListByUserAction,
  addRemovePlayerToInternalUserTeamAction,
  saveUserTeamAction,
  createUserTeamAction,
} from './redux';
import {Button} from 'react-bootstrap';
import {DefaultUserId, DefaultUserTeamId} from 'common/util';

const UserTeam = () => {
  const userteamDataProps = getUserTeamData();
  const fetchPlayerList = fetchAllPlayerListAction();
  const fetchPlayerListByUser = fetchPlayerListByUserAction();
  const updateCurrentUserTeam = addRemovePlayerToInternalUserTeamAction();
  const saveUserTeam = saveUserTeamAction();
  const createUserTeam = createUserTeamAction();
  const tabName = 'teamDetails';
  const isUserTeamAvailable =
    userteamDataProps.userteam && userteamDataProps.userteam.id;
  const currentUserTeamPlayers = userteamDataProps.currentUserTeamPlayers;

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchPlayerList();
    fetchPlayerListByUser(DefaultUserId);
  }, []);

  function onPlayerSelectedFromPlayerList(selectedRows: any) {
    console.log('from parent control', selectedRows);
    updateCurrentUserTeam(selectedRows);
  }

  function renderTeamDetails() {
    if (isUserTeamAvailable) {
      return <TeamDetails data={userteamDataProps} />;
    } else {
      return <CreateTeam createTeamAction={createUserTeam} />;
    }
  }

  function saveTeam() {
    console.log(
      'saving team with team player',
      userteamDataProps.currentUserTeamPlayers.length
    );
    const userteamId = DefaultUserTeamId;
    saveUserTeam(userteamId, currentUserTeamPlayers);
  }

  function validateSaveTeam() {
    const saveTeamEnable = currentUserTeamPlayers.length != 5;
    return saveTeamEnable;
  }

  function renderManageTransfer() {
    return (
      <div>
        <UserTeamPlayerDetails
          title="Your Selected Fantasy Team"
          data={userteamDataProps.currentUserTeamPlayers}
        />
        <Button
          variant="primary"
          onClick={() => saveTeam()}
          disabled={validateSaveTeam()}>
          Save Team
        </Button>
        <UserTeamPlayerDetails
          title="Fantasy Player List"
          data={userteamDataProps.playerList}
          onRowSelected={onPlayerSelectedFromPlayerList}
        />
      </div>
    );
  }

  const tabConfig: TabConfig[] = [
    {
      key: 'teamDetails',
      title: 'Team Details',
      renderfunction: renderTeamDetails(),
    },
    {
      key: 'transfer',
      title: 'Manage Transfer',
      renderfunction: renderManageTransfer(),
    },
  ];
  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = userteamDataProps.hasError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }
  return (
    <div>
      {renderStatusMessage(
        userteamDataProps.hasError,
        userteamDataProps.statusMessage
      )}
      <TabContainer defaultKey={tabName} tabConfig={tabConfig} />
    </div>
  );
};

export {UserTeam};
