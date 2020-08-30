import React, {useEffect, useState} from 'react';
import FantasyHelpContent from './components/FantasyHelpContent';
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
import {Form, Button, Row, Col, Carousel, Image} from 'react-bootstrap';
import history from 'common/config/history';
import LoadingOverlay from 'react-loading-overlay';
import {getCommonData} from '../../common/redux';
import {GameCorousel, StatusMessage} from 'common/components';
import UserTeamCard from 'common/components/Games/UserTeamCard';
import {isListEmpty} from 'common/util';
import {checkUserAccess} from '../../Authentication/redux';
import {bannerComingsoon} from '@logos/index';
import JoinLeagueModal from '../league/component/JoinLeagueModal';
import {joinLeagueAction} from '../league/redux';
import {Icon} from '../../../common/styles/Icon';

const FantasyHome = () => {
  const homeProps = getHomeData();
  const configProps = getCommonData();
  const fetchUpComingMatches = fetchUpComingMatchesAction();
  const fetchPublicLeague = fetchPublicLeagueAction();
  const fetchDashboard = getUserDashboardAction();
  const loginUser = isUserLogin();
  const dashboard = homeProps.dashboard;
  const [isfetching, setIsFetching] = useState(false);
  const [showJoinLeagueModal, setShowPrivateLeagueModal] = useState(false);
  const joinPrivateLeague = joinLeagueAction();

  useEffect(() => {
    isListEmpty(homeProps.leagueMatchesList) && fetchUpComingMatches();
    if (loginUser) {
      !dashboard.userTeamDTO && fetchDashboard();
    } else {
      fetchPublicLeague();
    }
  }, []);

  useEffect(() => {
    if (configProps.shouldRefresh && !isfetching) {
      fetchDashboard();
      setIsFetching(true);
      setShowPrivateLeagueModal(false);
    }
    if (!configProps.shouldRefresh) {
      setIsFetching(false);
    }
  });

  function goto(link: string) {
    history.push(link);
  }

  function renderJoinPrivateLeagueModal() {
    if (!showJoinLeagueModal || configProps.shouldRefresh) return;
    return (
      <JoinLeagueModal
        show={true}
        handleClose={(value: any) => setShowPrivateLeagueModal(value)}
        handleShow={(value: any) => setShowPrivateLeagueModal(value)}
        joinLeague={joinPrivateLeague}
      />
    );
  }

  function renderGoToButton(title: string, gotoUrl: string) {
    return (
      <Button
        variant="link"
        className="mr-1 homepageDataLink"
        onClick={() => goto(gotoUrl)}>
        {title}
      </Button>
    );
  }

  function renderAuthUserDashboard() {
    return (
      <div>
        <Form inline>
          {renderGoToButton('League', '/league')}
          {renderGoToButton('View Team', '/team')}
          <Button
            variant="link"
            className="mr-1 homepageDataLink"
            onClick={() => setShowPrivateLeagueModal(true)}>
            Private League
          </Button>
        </Form>
      </div>
    );
  }

  function renderUnAuthUserDashboard() {
    return (
      <div>
        <Form inline>
          {renderGoToButton('Help', '/helppage')}
          {renderGoToButton('Fixtures', '/Fixtures')}
          {renderGoToButton('View Stats', '/statistics')}
        </Form>
      </div>
    );
  }

  function renderUserTeamCard() {
    return (
      <Row>
        <Col>
          <UserTeamCard data={dashboard} />
        </Col>
      </Row>
    );
  }

  function renderUpComingMatchesSchedule() {
    if (!isListEmpty(dashboard.liveMatches)) return;
    return (
      <Row>
        <Col>
          <GameCorousel
            type="schedule"
            matchScheduleCard={homeProps.leagueMatchesList}
            data={dashboard.userTeamDTO}
          />
        </Col>
      </Row>
    );
  }

  function renderLiveMatchesSchedule() {
    return (
      <Row>
        <Col>
          <GameCorousel
            type="schedule"
            matchScheduleCard={dashboard.liveMatches}
            data={dashboard.userTeamDTO}
          />
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

  function renderIPLImage() {
    return (
      <div>
        <Image src={bannerComingsoon} width="100%" height="100px" />
      </div>
    );
  }

  function renderIPLbanner() {
    return (
      <div className="fantasyBanner">
        <Row>
          <Col>IPL Fantasy</Col>
        </Row>
        <Row>
          <Col>Play IPL fantasy with single Team. Old IPL Fantasy is Back</Col>
        </Row>
      </div>
    );
  }

  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = isError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }

  return (
    <div className="homeContainer">
      <LoadingOverlay
        active={configProps.isLoading}
        spinner
        text="Loading Home Details ...">
        {renderJoinPrivateLeagueModal()}
        {checkUserAccess()}
        <UserHomePageBoard />
        {renderIPLImage()}
        {renderStatusMessage(configProps.hasError, configProps.statusMessage)}
        {renderStatusMessage(false, 'Match cancelled due to corona')}
        {renderLiveMatchesSchedule()}
        {renderUpComingMatchesSchedule()}
        {loginUser && dashboard.userTeamDTO && renderUserTeamCard()}
        {!dashboard.userTeamDTO && renderFantasyInfoCard()}
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
