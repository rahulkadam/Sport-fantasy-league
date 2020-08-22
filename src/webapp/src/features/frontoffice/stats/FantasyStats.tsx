import React, {useEffect, useState} from 'react';
import './FantasyStats.styles.scss';
import MatchStats from './components/MatchStats';
import PlayerStats from './components/PlayerStats';
import UserStats from './components/UserStats';
import LoadingOverlay from 'react-loading-overlay';
import {
  fetchMatchStatsListAction,
  fetchPlayerStatsListAction,
  fetchUserStatsListAction,
  getStatsProps,
} from './redux';
import {fetchMatchListAction, getMatchData} from '../../admin/Match/redux';
import {fetchAllPlayerListAction, getUserTeamData} from '../UserTeam/redux';
import {Button, Form} from 'react-bootstrap';

const FantasyStats = () => {
  const statsProps = getStatsProps();
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
    return (
      <MatchStats
        data={matchList}
        action={fetchMatchStats}
        playerStats={statsProps.playerStats}
      />
    );
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

  function fetchUserStatsMatchWise(matchId: any) {
    fetchUserStats(userTeamProps.userteam.id, matchId);
  }

  function renderUserStats() {
    return (
      <UserStats
        playerList={playerList}
        playerStats={statsProps.playerStats}
        action={fetchUserStatsMatchWise}
        matchList={matchList}
      />
    );
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

  function renderStatsComponent() {
    let component: any = <div></div>;
    component = tabConfig.find(tab => {
      return tab.key == tabName;
    });
    return component.renderfunction || <div></div>;
  }

  function renderStatsActions() {
    return (
      <Form inline className="statsAction">
        <Button
          variant="outline-primary"
          className="mr-2"
          onClick={() => setTabName('matchstats')}>
          Match
        </Button>
        <Button
          variant="outline-primary"
          className="mr-2"
          onClick={() => setTabName('playerstats')}>
          Player
        </Button>
        <Button
          variant="outline-primary"
          className="mr-2"
          onClick={() => setTabName('userstats')}>
          Your Stats
        </Button>
      </Form>
    );
  }

  return (
    <div className="statsContainer">
      <LoadingOverlay active={false} spinner text="Loading Stats Details ...">
        {renderStatsActions()}
        {renderStatsComponent()}
      </LoadingOverlay>
    </div>
  );
};

export default FantasyStats;
