import React, {useEffect, Fragment, useState} from 'react';
import {
  getLeagueData,
  fetchUserLeagueListAction,
  joinLeagueAction,
  createLeagueAction,
  fetchPlayerListByUserForLeagueAction,
} from './redux';
import {LeagueList} from './component/LeagueList';
import {JoinLeague} from './component/JoinLeague';
import {CreateLeague} from './component/CreateLeague';
import {StatusMessage} from 'common/components';
import './League.styles.scss';
import {getTournamentData} from '../../admin/Tournament/redux';
import {checkUserAccess, GetLoginStoreData} from '../../Authentication/redux';
import LoadingOverlay from 'react-loading-overlay';
import {Button, Form} from 'react-bootstrap';
import {fetchPlayerListByUserAction, getUserTeamData} from '../UserTeam/redux';
import history from 'common/config/history';

const League = () => {
  const leagueProps = getLeagueData();
  const tournamentProps = getTournamentData();
  const userProps = GetLoginStoreData();
  const fetchPlayerListByUser = fetchPlayerListByUserAction();
  const userteamDataProps = getUserTeamData();
  const isUserTeamAvailable =
    userteamDataProps.userteam && userteamDataProps.userteam.id;
  const leagueObjdata = leagueProps.data || {};
  const userleagueList = leagueObjdata.userleagueList || [];
  const leagueMemberTeamDetails = leagueProps.leagueMemberTeam;
  const fetchTeamListByUserForLeague = fetchPlayerListByUserForLeagueAction();
  const fetchUserLeagueList = fetchUserLeagueListAction();
  const joinLeague = joinLeagueAction();
  const createLeague = createLeagueAction();
  const [tabName, setTabName] = useState('overview');
  const defaultTabKey = 'overview';
  const userId = userProps.id || 99999;

  if (leagueProps.shouldRefresh && tabName != defaultTabKey) {
    setTabName(defaultTabKey);
  }

  useEffect(() => {
    fetchUserLeagueList(userId);
    if (!isUserTeamAvailable) {
      fetchPlayerListByUser(userProps.id);
    }
  }, []);
  useEffect(() => {
    if (leagueProps.shouldRefresh) {
      fetchUserLeagueList(userId);
    }
  });

  function renderLeagueActions() {
    return (
      <Form inline className="leagueAction">
        <Button
          variant={tabName == 'overview' ? 'primary' : 'outline-primary'}
          className="mr-1 leagueTabMenuLink"
          onClick={() => setTabName('overview')}>
          Overview
        </Button>
        <Button
          variant={tabName == 'createLeague' ? 'primary' : 'outline-primary'}
          className="mr-1 leagueTabMenuLink"
          onClick={() => setTabName('createLeague')}>
          Create
        </Button>
        <Button
          variant={tabName == 'joinLeague' ? 'primary' : 'outline-primary'}
          className="mr-1 leagueTabMenuLink"
          onClick={() => setTabName('joinLeague')}>
          Join League
        </Button>
      </Form>
    );
  }

  function renderLeagueOverview() {
    return (
      <Fragment>
        {userleagueList.length > 0 && (
          <LeagueList
            userleagueList={userleagueList}
            fetchTeamListByUser={fetchTeamListByUserForLeague}
            playerList={leagueMemberTeamDetails}
          />
        )}
        {userleagueList.length == 0 && (
          <JoinLeague data={{joinleague: joinLeague}} userid={userId} />
        )}
      </Fragment>
    );
  }

  function renderJoinLeague() {
    return <JoinLeague data={{joinleague: joinLeague}} userid={userId} />;
  }

  function renderCreateLeague() {
    return (
      <CreateLeague
        createLeague={createLeague}
        tournamentList={tournamentProps.tournamentList}
        userId={userId}
      />
    );
  }

  function goToTeamTab() {
    history.push('/team');
    return <div />;
  }

  function renderLeagueComponents() {
    switch (tabName) {
      case 'overview':
        return renderLeagueOverview();
      case 'joinLeague':
        return renderJoinLeague();
      case 'createLeague':
        return renderCreateLeague();
      default:
        return renderLeagueOverview();
    }
  }

  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = leagueProps.hasError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }

  return (
    <div className="leagueContainer">
      <LoadingOverlay
        active={leagueProps.isLoading}
        spinner
        text="Loading League Details ...">
        {!isUserTeamAvailable && goToTeamTab()}
        {renderStatusMessage(leagueProps.hasError, leagueProps.statusMessage)}
        {checkUserAccess()}
        {renderLeagueActions()}
        {renderLeagueComponents()}
      </LoadingOverlay>
    </div>
  );
};

export default League;
