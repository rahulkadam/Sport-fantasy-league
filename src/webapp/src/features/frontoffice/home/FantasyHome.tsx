import React, {useEffect} from 'react';
import FantasyHelpContent from './components/FantasyHelpContent';
import MatchStatsData from './components/MatchStatsData';
import {getHomeData, fetchUpComingMatchesAction} from './redux';
import './Home.styles.scss';
import {getAccessToken} from 'API';
import UserHomePageBoard from './components/UserHomePageBoard';
import HowToPlay from './components/HowToPlay';
import {Form, Button} from 'react-bootstrap';
import history from 'common/config/history';
import LoadingOverlay from 'react-loading-overlay';
import {getCommonData} from '../../common/redux';

const FantasyHome = () => {
  const homeProps = getHomeData();
  const configProps = getCommonData();
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
            className="mr-1 homepageDataLink"
            onClick={() => goto('/league')}>
            League
          </Button>
          <Button
            variant="link"
            className="mr-1 homepageDataLink"
            onClick={() => goto('/team')}>
            View Team
          </Button>
          <Button
            variant="link"
            className="mr-1 homepageDataLink"
            onClick={() => goto('/statistics')}>
            View Stats
          </Button>
        </Form>
      </div>
    );
  }

  function renderUnAuthUserDashboard() {
    return (
      <div>
        <Form inline>
          <Button
            variant="link"
            className="mr-1 homepageDataLink"
            onClick={() => goto('/helppage')}>
            Help
          </Button>
          <Button
            variant="link"
            className="mr-1 homepageDataLink"
            onClick={() => goto('/fixtures')}>
            Fixtures
          </Button>
          <Button
            variant="link"
            className="mr-1 homepageDataLink"
            onClick={() => goto('/statistics')}>
            View Stats
          </Button>
        </Form>
      </div>
    );
  }

  return (
    <div className="homeContainer">
      <LoadingOverlay
        active={configProps.isLoading}
        spinner
        text="Loading Home Details ...">
        <UserHomePageBoard />
        <MatchStatsData {...homeProps} />
        {accessToken && renderAuthUserDashboard()}
        {!accessToken && renderUnAuthUserDashboard()}
        <HowToPlay />
        <UserHomePageBoard />
      </LoadingOverlay>
    </div>
  );
};

export default FantasyHome;
