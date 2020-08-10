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
import {GetLoginStoreData} from '../Authentication/redux';

const League = () => {
  const leagueStoreData = getLeagueData();
  const tournamentProps = getTournamentData();
  const userProps = GetLoginStoreData();
  const leagueObjdata = leagueStoreData.data || {};
  const userleagueList = leagueObjdata.userleagueList || [];
  const fetchUserLeagueList = fetchUserLeagueListAction();
  const joinLeague = joinLeagueAction();
  const createLeague = createLeagueAction();
  const defaultTabKey = 'overview';
  const [tabName, setTabName] = useState(leagueStoreData.tabName);
  const userId = userProps.id || 9999;

  if (leagueStoreData.shouldRefresh && tabName != defaultTabKey) {
    setTabName(defaultTabKey);
  }

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchUserLeagueList(userId);
  }, []);
  useEffect(() => {
    if (leagueStoreData.shouldRefresh) {
      fetchUserLeagueList(userId);
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
          <JoinLeague data={{joinleague: joinLeague}} userid={userId} />
        )}
      </Fragment>
    );
  }

  function renderJoinLeague() {
    return <JoinLeague data={{joinleague: joinLeague}} userid={userId} />;
  }

  function renderCreateLeague() {
    return (
      <CreateLeague
        createLeague={createLeague}
        tournamentList={tournamentProps.tournamentList}
        userId={userId}
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
