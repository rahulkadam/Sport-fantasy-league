import React, {Fragment} from 'react';
import {TabContainer} from 'common/components';
import {UserTeamPlayerDetails} from './component';
import {getUserTeamData} from './redux';

const UserTeam = () => {
  const userteamDataProps = getUserTeamData();
  const tabName = 'overview';

  function renderComponent() {
    return <Fragment>Team Details</Fragment>;
  }

  function renderUserTeamList() {
    return (
      <div>
        <UserTeamPlayerDetails data={userteamDataProps.data} />
        <UserTeamPlayerDetails data={userteamDataProps.data} />
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
