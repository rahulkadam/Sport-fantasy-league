import React, {useEffect} from 'react';
import FantasyHelpContent from './components/FantasyHelpContent';
import MatchStatsData from './components/MatchStatsData';
import {getHomeData, fetchUpComingMatchesAction} from './redux';
import './Home.styles.scss';
import {getAccessToken} from 'API';
import UserHomePageBoard from './components/UserHomePageBoard';
import HowToPlay from './components/HowToPlay';
import {Row, Col, Form, Button} from 'react-bootstrap';
import history from 'common/config/history';

const FantasyHome = () => {
  const props = getHomeData();
  const accessToken = getAccessToken();
  const fetchUpComingMatches = fetchUpComingMatchesAction();
  useEffect(() => {
    fetchUpComingMatches();
  }, []);

  function goto(link: string) {
    history.push(link);
  }

  function renderAuthUserDashboard() {
    return (
      <div>
        <Form inline>
          <Button
            variant="link"
            className="mr-1"
            onClick={() => goto('/league')}>
            League
          </Button>
          <Button variant="link" className="mr-1" onClick={() => goto('/team')}>
            View Team
          </Button>
          <Button
            variant="link"
            className="mr-1"
            onClick={() => goto('/statistics')}>
            View Stats
          </Button>
        </Form>
      </div>
    );
  }

  return (
    <div className="homeContainer">
      <UserHomePageBoard />
      <MatchStatsData {...props} />
      {accessToken && renderAuthUserDashboard()}
      <HowToPlay />
    </div>
  );
};

export default FantasyHome;
