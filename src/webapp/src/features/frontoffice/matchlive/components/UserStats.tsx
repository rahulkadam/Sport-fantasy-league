import React from 'react';
import MatchStats from './MatchStats';
const UserStats = (prop: UserStatsProps) => {
  function renderMatchUserStats() {
    return (
      <MatchStats
        data={prop.matchList}
        action={prop.action}
        playerStats={prop.playerStats}
        title="Your Score Stats"
      />
    );
  }
  return <div>{renderMatchUserStats()}</div>;
};

export default UserStats;
