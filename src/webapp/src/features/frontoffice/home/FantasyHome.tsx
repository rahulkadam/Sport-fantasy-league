import React, {useEffect} from 'react';
import FantasyHelpContent from './components/FantasyHelpContent';
import MatchStatsData from './components/MatchStatsData';
import {getHomeData, fetchUpComingMatchesAction} from './redux';
import './Home.styles.scss';

const FantasyHome = () => {
  const props = getHomeData();
  const fetchUpComingMatches = fetchUpComingMatchesAction();
  useEffect(() => {
    fetchUpComingMatches();
  }, []);

  return (
    <div className="homeContainer">
      <MatchStatsData {...props} />
      <FantasyHelpContent />
    </div>
  );
};

export default FantasyHome;
