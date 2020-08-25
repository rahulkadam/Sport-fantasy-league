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
import {getCommonData} from '../../common/redux';
import {isListEmpty} from '../../../common/util';

const League = () => {
  const leagueProps = getLeagueData();
  const tournamentProps = getTournamentData();
  const configProps = getCommonData();
  const userProps = GetLoginStoreData();
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
  const [isfetching, setIsFetching] = useState(false);

  if (leagueProps.shouldRefresh && tabName != defaultTabKey) {
    setTabName(defaultTabKey);
  }

  useEffect(() => {
    isListEmpty(userleagueList) && fetchUserLeagueList(userId);
  }, []);
  useEffect(() => {
    if (leagueProps.shouldRefresh && !isfetching) {
      fetchUserLeagueList(userId);
      setIsFetching(true);
    }
    if (!leagueProps.shouldRefresh) {
      setIsFetching(false);
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
    const statusClassName = isError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }

  return (
    <div className="leagueContainer">
      <LoadingOverlay
        active={configProps.isLoading}
        spinner
        text="Loading League Details ...">
        {renderStatusMessage(configProps.hasError, configProps.statusMessage)}
        {checkUserAccess()}
        {renderLeagueActions()}
        {renderLeagueComponents()}
      </LoadingOverlay>
    </div>
  );
};

export default League;
