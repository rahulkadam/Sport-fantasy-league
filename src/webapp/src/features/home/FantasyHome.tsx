import React, {useEffect} from 'react';
import FantasyHelpContent from './components/FantasyHelpContent';
import MatchStatsData from './components/MatchStatsData';
import {getHomeData, fetchUpComingMatchesAction} from './redux';

const FantasyHome = () => {
  const props = getHomeData();
  const fetchUpComingMatches = fetchUpComingMatchesAction();
  useEffect(() => {
    fetchUpComingMatches();
  }, []);

  return (
    <div>
      <MatchStatsData {...props} />
      <FantasyHelpContent />
    </div>
  );
};

export default FantasyHome;
