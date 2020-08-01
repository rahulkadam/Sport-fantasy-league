import React, {Fragment, useEffect} from 'react';
import {StatusMessage, TabContainer} from 'common/components';
import {UserTeamPlayerDetails} from './component';
import {
  fetchAllPlayerListAction,
  getUserTeamData,
  fetchPlayerListByUserAction,
  addRemovePlayerToInternalUserTeamAction,
} from './redux';
import {Button} from 'react-bootstrap';

const UserTeam = () => {
  const userteamDataProps = getUserTeamData();
  const fetchPlayerList = fetchAllPlayerListAction();
  const fetchPlayerListByUser = fetchPlayerListByUserAction();
  const updateCurrentUserTeam = addRemovePlayerToInternalUserTeamAction();
  const tabName = 'teamDetails';

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchPlayerList();
    fetchPlayerListByUser(18);
  }, []);
  useEffect(() => {
    console.log('component will Mount, render everytime');
  });
  function onPlayerSelectedFromPlayerList(selectedRows: any) {
    console.log('from parent control', selectedRows);
    updateCurrentUserTeam(selectedRows);
  }

  function renderTeamDetails() {
    return (
      <Fragment>
        <UserTeamPlayerDetails
          title="Your Fantasy Team"
          data={userteamDataProps.userTeamPlayers}
        />
      </Fragment>
    );
  }

  function saveTeam() {
    console.log(
      'saving team with team player',
      userteamDataProps.currentUserTeamPlayers.length
    );
  }

  function renderManageTransfer() {
    return (
      <div>
        <UserTeamPlayerDetails
          title="Your Selected Fantasy Team"
          data={userteamDataProps.currentUserTeamPlayers}
        />
        <Button variant="primary" onClick={() => saveTeam()}>
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
      Welcome to User Team List with
      {renderStatusMessage(
        userteamDataProps.hasError,
        userteamDataProps.statusMessage
      )}
      <TabContainer defaultKey={tabName} tabConfig={tabConfig} />
    </div>
  );
};

export {UserTeam};
