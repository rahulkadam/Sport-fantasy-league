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
import {
  fetchCompletedMatchListAction,
  getMatchData,
} from '../../admin/Match/redux';
import {fetchAllPlayerListAction, getUserTeamData} from '../UserTeam/redux';
import {Button, Form} from 'react-bootstrap';
import {StatusMessage} from 'common/components';
import {isUserLogin} from 'API';
import {getCommonData} from '../../common/redux';
import {
  TWITTER_LIST_STATS,
  TwitterFantasyTimeline,
} from 'common/components/Footer/socialmedia';
import {GA_Other_Event} from '../../../common/config';

const FantasyStats = () => {
  const statsProps = getStatsProps();
  const configProps = getCommonData();
  const fetchMatchStats = fetchMatchStatsListAction();
  const fetchPlayerStats = fetchPlayerStatsListAction();
  const fetchUserStats = fetchUserStatsListAction();
  const matchProps = getMatchData();
  const matchList = matchProps.matchList;
  const fetchMatchList = fetchCompletedMatchListAction();
  const userTeamProps = getUserTeamData();
  const playerList = userTeamProps.playerList;
  const fetchPlayerList = fetchAllPlayerListAction();
  const userLogin = isUserLogin();
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
      <div>
        <StatusMessage
          type="info"
          text="Select below match to see Player scoring history in Match"
        />
        <MatchStats
          data={matchList}
          action={fetchMatchStats}
          playerStats={statsProps.playerStats}
          title="Match Player Stats"
        />
      </div>
    );
  }

  function renderPlayerStats() {
    return (
      <div>
        <StatusMessage
          type="info"
          text="Click on  below Player to see Player scoring history in League"
        />
        <PlayerStats
          playerList={playerList}
          playerStats={statsProps.playerStats}
          action={fetchPlayerStats}
        />
      </div>
    );
  }

  function fetchUserStatsMatchWise(matchId: any) {
    GA_Other_Event('FETCH_USER_STATS_BY_MATCH');
    fetchUserStats(userTeamProps.userteam.id, matchId);
  }

  function renderUserStats() {
    return (
      <div>
        <StatusMessage
          type="info"
          text="Select below match to see your scoring history"
        />
        <UserStats
          playerList={playerList}
          playerStats={statsProps.playerStats}
          action={fetchUserStatsMatchWise}
          matchList={matchList}
        />
      </div>
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

  function renderActionBtn(value: string, action: string) {
    const isprimary = tabName == action ? 'success' : 'outline-success';
    return (
      <Button
        variant={isprimary}
        className="mr-2"
        onClick={() => setTabName(action)}>
        {value}
      </Button>
    );
  }

  function renderStatsActions() {
    return (
      <Form inline className="statsAction">
        {renderActionBtn('Match', 'matchstats')}
        {renderActionBtn('Player', 'playerstats')}
        {userLogin && renderActionBtn('Your Stats', 'userstats')}
      </Form>
    );
  }
  function renderTwitterHashtag() {
    return <TwitterFantasyTimeline type="list" id={TWITTER_LIST_STATS} />;
  }

  return (
    <div className="statsContainer">
      <LoadingOverlay
        active={configProps.isLoading}
        spinner
        text="Loading Stats Details ...">
        <div className="statsTitle">IPL Stats</div>
        {renderStatsActions()}
        {renderStatsComponent()}
        {renderTwitterHashtag()}
      </LoadingOverlay>
    </div>
  );
};

export default FantasyStats;
