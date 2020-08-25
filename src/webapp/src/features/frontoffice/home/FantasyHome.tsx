import React, {useEffect} from 'react';
import FantasyHelpContent from './components/FantasyHelpContent';
import MatchStatsData from './components/MatchStatsData';
import {
  getHomeData,
  fetchUpComingMatchesAction,
  fetchPublicLeagueAction,
  getUserDashboardAction,
} from './redux';
import './Home.styles.scss';
import {isUserLogin} from 'API';
import UserHomePageBoard from './components/UserHomePageBoard';
import HowToPlay from './components/HowToPlay';
import {Form, Button, Row, Col, Carousel} from 'react-bootstrap';
import history from 'common/config/history';
import LoadingOverlay from 'react-loading-overlay';
import {getCommonData} from '../../common/redux';
import {GameCorousel, Logo} from 'common/components';
import UserTeamCard from 'common/components/Games/UserTeamCard';
import {isListEmpty} from '../../../common/util';
import {checkUserAccess} from '../../Authentication/redux';
import {teamRCB} from '@logos/index';

const FantasyHome = () => {
  const homeProps = getHomeData();
  const configProps = getCommonData();
  const fetchUpComingMatches = fetchUpComingMatchesAction();
  const fetchPublicLeague = fetchPublicLeagueAction();
  const fetchDashboard = getUserDashboardAction();
  const loginUser = isUserLogin();
  const dashboard = homeProps.dashboard;

  useEffect(() => {
    isListEmpty(homeProps.leagueMatchesList) && fetchUpComingMatches();
    if (loginUser) {
      !dashboard.userTeamDTO && fetchDashboard();
    } else {
      fetchPublicLeague();
    }
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

  function renderUserTeamCard() {
    return (
      <Row>
        <Col>
          <UserTeamCard data={homeProps.dashboard} />
        </Col>
      </Row>
    );
  }

  function renderUserPublicLeagues() {
    const leagueList = loginUser
      ? dashboard.publicLeagues
      : homeProps.publicLeagueList;
    return (
      <Row>
        <Col>
          <GameCorousel
            type="league"
            leagueList={leagueList}
            data={dashboard.userTeamDTO}
          />
        </Col>
      </Row>
    );
  }

  function renderFantasyInfoCard() {
    return (
      <Row>
        <Col>
          <GameCorousel type="dashboardFantasyinfo" />
        </Col>
      </Row>
    );
  }

  return (
    <div className="homeContainer">
      <LoadingOverlay
        active={configProps.isLoading}
        spinner
        text="Loading Home Details ...">
        {checkUserAccess()}
        <UserHomePageBoard />
        <MatchStatsData {...homeProps} />
        {loginUser && homeProps.dashboard.userTeamDTO && renderUserTeamCard()}
        {!homeProps.dashboard.userTeamDTO && renderFantasyInfoCard()}
        {renderUserPublicLeagues()}
        {loginUser && renderAuthUserDashboard()}
        {!loginUser && renderUnAuthUserDashboard()}
        <HowToPlay />
        <UserHomePageBoard />
      </LoadingOverlay>
    </div>
  );
};

export default FantasyHome;
