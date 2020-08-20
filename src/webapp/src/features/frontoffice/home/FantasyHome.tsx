import React, {useEffect} from 'react';
import FantasyHelpContent from './components/FantasyHelpContent';
import MatchStatsData from './components/MatchStatsData';
import {getHomeData, fetchUpComingMatchesAction} from './redux';
import './Home.styles.scss';
import {getAccessToken} from 'API';
import UserHomePageBoard from './components/UserHomePageBoard';
import HowToPlay from './components/HowToPlay';

const FantasyHome = () => {
  const props = getHomeData();
  const accessToken = getAccessToken();
  const fetchUpComingMatches = fetchUpComingMatchesAction();
  useEffect(() => {
    fetchUpComingMatches();
  }, []);

  return (
    <div className="homeContainer">
      <UserHomePageBoard />
      <HowToPlay />
    </div>
  );
};

export default FantasyHome;
