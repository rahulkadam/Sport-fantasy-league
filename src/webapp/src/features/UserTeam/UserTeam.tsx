import React, {Fragment} from 'react';
import {TabContainer} from 'common/components';

const UserTeam = () => {
  const tabName = 'overview';

  function renderComponent() {
    return <Fragment>Team Details</Fragment>;
  }

  const tabConfig: TabConfig[] = [
    {
      key: 'overview',
      title: 'Team Overview',
      renderfunction: renderComponent(),
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
