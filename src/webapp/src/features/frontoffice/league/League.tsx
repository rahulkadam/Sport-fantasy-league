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
import {Button, Form, Badge} from 'react-bootstrap';
import {getCommonData} from '../../common/redux';
import {isListEmpty} from '../../../common/util';
import Helmet from 'react-helmet';
import {
  TwitterFantasyTimeline,
  TWITTER_LIST_LEAGUE,
} from 'common/components/Footer/socialmedia';
import history from 'common/config/history';

const League = () => {
  const leagueProps = getLeagueData();
  const tournamentProps = getTournamentData();
  const configProps = getCommonData();
  const userProps = GetLoginStoreData();
  const leagueObjdata = leagueProps.data || {};
  const userleagueList = leagueObjdata.userleagueList || [];
  const leagueMemberTeamDetails = leagueProps.leagueMemberTeam || {};
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

  function renderTabActionBtn(actionName: string, title: string) {
    const variant = tabName == actionName ? 'success' : 'outline-success';
    return (
      <Button
        variant={variant}
        className="mr-1 leagueTabMenuLink"
        onClick={() => setTabName(actionName)}>
        {title}
      </Button>
    );
  }

  function renderLeagueActions() {
    return (
      <Form inline className="leagueAction">
        {renderTabActionBtn('overview', 'Overview')}
        {renderTabActionBtn('createLeague', 'Create')}
        {renderTabActionBtn('joinLeague', 'Join League')}
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
            playerList={leagueMemberTeamDetails.teamPlayersPlayerDTOList}
            captainId={leagueMemberTeamDetails.team_captain_player_Id}
          />
        )}
        {userleagueList.length == 0 && (
          <JoinLeague data={{joinleague: joinLeague}} userid={userId} />
        )}
      </Fragment>
    );
  }

  function renderJoinLeague() {
    return <JoinLeague data={{joinleague: joinLeague}} />;
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

  function renderTwitterHashtag() {
    return <TwitterFantasyTimeline type="list" id={TWITTER_LIST_LEAGUE} />;
  }

  function renderJoinPublicLeagueMsg() {
    return (
      <div className="secondaryMenu">
        <Badge variant="warning">Join More Public League from HomePage</Badge>
      </div>
    );
  }

  function goto(link: string) {
    history.push(link);
  }

  function renderGoToButton(title: string, gotoUrl: string) {
    return (
      <Button
        variant="outline-success"
        className="mr-1 buttonMargin"
        onClick={() => goto(gotoUrl)}>
        {title}
      </Button>
    );
  }

  function renderActionFooterForSwitch() {
    return (
      <div className="secondaryMenu">
        <Form inline>
          {renderGoToButton('Home', '/')}
          {renderGoToButton('View Team', '/team')}
        </Form>
      </div>
    );
  }
  return (
    <div className="leagueContainer">
      <LoadingOverlay
        active={configProps.isLoading}
        spinner
        text="Loading League Details ...">
        <Helmet>
          <title>IPL Leagues : public/private</title>
        </Helmet>
        <div className="leagueTitle">Leagues</div>
        {renderStatusMessage(configProps.hasError, configProps.statusMessage)}
        {checkUserAccess()}
        {renderLeagueActions()}
        {renderLeagueComponents()}
        {renderJoinPublicLeagueMsg()}
        {renderActionFooterForSwitch()}
        {renderTwitterHashtag()}
      </LoadingOverlay>
    </div>
  );
};

export default League;
