import React from 'react';
import FantasyHelpContent from './components/FantasyHelpContent';
import MatchStatsData from './components/MatchStatsData';

const FantasyHome = () => {
  return (
    <div>
      <MatchStatsData />
      <FantasyHelpContent />
    </div>
  );
};

export default FantasyHome;
