import React, {Fragment, useEffect} from 'react';
import {TabContainer} from 'common/components';
import {UserTeamPlayerDetails} from './component';
import {
  fetchAllPlayerListAction,
  getUserTeamData,
  fetchPlayerListByUserAction,
} from './redux';

const UserTeam = () => {
  const userteamDataProps = getUserTeamData();
  const fetchPlayerList = fetchAllPlayerListAction();
  const fetchPlayerListByUser = fetchPlayerListByUserAction();
  const tabName = 'overview';

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchPlayerList();
    fetchPlayerListByUser(76);
  }, []);
  useEffect(() => {
    console.log('component will Mount, render everytime');
  });

  function renderComponent() {
    return <Fragment>Team Details</Fragment>;
  }

  function renderUserTeamList() {
    return (
      <div>
        <UserTeamPlayerDetails data={userteamDataProps.playerList} />
        <UserTeamPlayerDetails data={userteamDataProps.userTeamPlayers} />
      </div>
    );
  }

  const tabConfig: TabConfig[] = [
    {
      key: 'overview',
      title: 'Team Overview',
      renderfunction: renderUserTeamList(),
    },
    {
      key: 'teamDetails',
      title: 'Team Details',
      renderfunction: renderComponent(),
    },
    {
      key: 'transfer',
      title: 'Manage Transfer',
      renderfunction: renderComponent(),
    },
  ];
  return (
    <div>
      Welcome to User Team List with
      <TabContainer defaultKey={tabName} tabConfig={tabConfig} />
    </div>
  );
};

export {UserTeam};
