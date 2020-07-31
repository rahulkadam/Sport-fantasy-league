import React, {useEffect, Fragment} from 'react';
import {
  getLeagueData,
  fetchUserLeagueListAction,
  joinLeagueAction,
} from './redux';
import {LeagueList} from './component/LeagueList';
import {JoinLeague} from './component/JoinLeague';
import {CreateLeague} from './component/CreateLeague';
import {StatusMessage} from 'common/components';
import {TabContainer} from 'common/components';
import './League.styles.scss';

const League = () => {
  const leagueStoreData = getLeagueData();
  const leagueObjdata = leagueStoreData.data || {};
  const userleagueList = leagueObjdata.userleagueList || [];
  const fetchUserLeagueList = fetchUserLeagueListAction();
  const joinLeague = joinLeagueAction();
  const tabName = 'overview';

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchUserLeagueList();
  }, []);
  useEffect(() => {
    console.log('component will Mount, render everytime');
  });

  function renderLeagueOverview() {
    return (
      <Fragment>
        {userleagueList.length > 0 && (
          <LeagueList userleagueList={userleagueList} />
        )}
        {userleagueList.length == 0 && (
          <JoinLeague data={{joinleague: joinLeague}} />
        )}
      </Fragment>
    );
  }

  function renderJoinLeague() {
    return <JoinLeague data={{joinleague: joinLeague}} />;
  }

  function renderCreateLeague() {
    return <CreateLeague data={{joinleague: joinLeague}} />;
  }

  const tabConfig: TabConfig[] = [
    {
      key: 'overview',
      title: 'League Overview',
      renderfunction: renderLeagueOverview(),
    },
    {
      key: 'joinLeague',
      title: 'Join League',
      renderfunction: renderJoinLeague(),
    },
    {
      key: 'createLeague',
      title: 'Create League',
      renderfunction: renderCreateLeague(),
    },
  ];
  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = leagueStoreData.hasError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }

  return (
    <div>
      League Summary
      {renderStatusMessage(
        leagueStoreData.hasError,
        leagueStoreData.statusMessage
      )}
      <TabContainer defaultKey={tabName} tabConfig={tabConfig} />
    </div>
  );
};

export {League};
