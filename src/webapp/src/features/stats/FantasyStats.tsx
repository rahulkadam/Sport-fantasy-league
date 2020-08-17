import React, {useState} from 'react';
import './FantasyStats.styles.scss';
import MatchStats from './components/MatchStats';
import PlayerStats from './components/PlayerStats';
import UserStats from './components/UserStats';
import {TabContainer} from '../../common/components/TabContainer';
import LoadingOverlay from 'react-loading-overlay';

const FantasyStats = () => {
  const defaultTabKey = 'matchstats';
  const [tabName, setTabName] = useState(defaultTabKey);

  function renderMatchStats() {
    return <MatchStats />;
  }

  function renderPlayerStats() {
    return <PlayerStats />;
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
      <LoadingOverlay active={false} spinner text="Loading League Details ...">
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
