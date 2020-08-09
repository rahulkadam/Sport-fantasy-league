import React, {useEffect, Fragment, useState} from 'react';
import {
  getLeagueData,
  fetchUserLeagueListAction,
  joinLeagueAction,
  createLeagueAction,
} from './redux';
import {LeagueList} from './component/LeagueList';
import {JoinLeague} from './component/JoinLeague';
import {CreateLeague} from './component/CreateLeague';
import {StatusMessage} from 'common/components';
import {TabContainer} from 'common/components';
import './League.styles.scss';
import {getTournamentData} from '../admin/Tournament/redux';
import {DefaultUserId} from 'common/util';

const League = () => {
  const leagueStoreData = getLeagueData();
  const tournamentProps = getTournamentData();
  const leagueObjdata = leagueStoreData.data || {};
  const userleagueList = leagueObjdata.userleagueList || [];
  const fetchUserLeagueList = fetchUserLeagueListAction();
  const joinLeague = joinLeagueAction();
  const createLeague = createLeagueAction();
  const defaultTabKey = 'overview';
  const [tabName, setTabName] = useState(leagueStoreData.tabName);

  if (leagueStoreData.shouldRefresh && tabName != defaultTabKey) {
    setTabName(defaultTabKey);
  }

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchUserLeagueList(DefaultUserId);
  }, []);
  useEffect(() => {
    if (leagueStoreData.shouldRefresh) {
      // fetchUserLeagueList(DefaultUserId);
    }
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
    return (
      <CreateLeague
        createLeague={createLeague}
        tournamentList={tournamentProps.tournamentList}
      />
    );
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
      {renderStatusMessage(
        leagueStoreData.hasError,
        leagueStoreData.statusMessage
      )}
      <TabContainer
        defaultKey="overview"
        tabConfig={tabConfig}
        activeKey={tabName}
        onSelect={(key: string) => setTabName(key)}
      />
    </div>
  );
};

export {League};
