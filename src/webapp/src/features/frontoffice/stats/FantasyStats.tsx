import React, {useEffect, useState} from 'react';
import './FantasyStats.styles.scss';
import MatchStats from './components/MatchStats';
import PlayerStats from './components/PlayerStats';
import UserStats from './components/UserStats';
import {TabContainer} from 'common/components/TabContainer';
import LoadingOverlay from 'react-loading-overlay';
import {
  fetchMatchStatsListAction,
  fetchPlayerStatsListAction,
  fetchUserStatsListAction,
  getStatsProps,
} from './redux';
import {fetchMatchListAction, getMatchData} from '../../admin/Match/redux';
import {fetchAllPlayerListAction, getUserTeamData} from '../UserTeam/redux';

const FantasyStats = () => {
  const statsProps = getStatsProps() || {};
  const fetchMatchStats = fetchMatchStatsListAction();
  const fetchPlayerStats = fetchPlayerStatsListAction();
  const fetchUserStats = fetchUserStatsListAction();
  const matchProps = getMatchData();
  const matchList = matchProps.matchList;
  const fetchMatchList = fetchMatchListAction();
  const userTeamProps = getUserTeamData();
  const playerList = userTeamProps.playerList;
  const fetchPlayerList = fetchAllPlayerListAction();
  useEffect(() => {
    if (!matchList || matchList.length == 0) {
      fetchMatchList();
    }
    if (!playerList || playerList.length == 0) {
      fetchPlayerList();
    }
  }, []);

  const defaultTabKey = 'matchstats';
  const [tabName, setTabName] = useState(defaultTabKey);

  function renderMatchStats() {
    return <MatchStats data={matchList} action={fetchMatchStats} />;
  }

  function renderPlayerStats() {
    return (
      <PlayerStats
        playerList={playerList}
        playerStats={statsProps.playerStats}
        action={fetchPlayerStats}
      />
    );
  }

  function renderUserStats() {
    return <UserStats />;
  }

  const tabConfig: TabConfig[] = [
    {
      key: 'matchstats',
      title: 'Match Stats',
      renderfunction: renderMatchStats(),
    },
    {
      key: 'playerstats',
      title: 'Player Stats',
      renderfunction: renderPlayerStats(),
    },
    {
      key: 'userstats',
      title: 'User Stats',
      renderfunction: renderUserStats(),
    },
  ];
  return (
    <div className="statsContainer">
      <LoadingOverlay active={false} spinner text="Loading Stats Details ...">
        <TabContainer
          defaultKey="matchstats"
          tabConfig={tabConfig}
          activeKey={tabName}
          onSelect={(key: string) => setTabName(key)}
        />
      </LoadingOverlay>
    </div>
  );
};

export default FantasyStats;
