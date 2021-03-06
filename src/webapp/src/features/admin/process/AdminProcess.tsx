import React, {useEffect, Fragment, useState} from 'react';
import {Row, Col, Button, Form, Badge} from 'react-bootstrap';
import {
  lockTournamentAction,
  unLockTournamentAction,
  processScoreByMatchAction,
  processRankingAction,
  getAdminProcessData,
  initUserMatchDataAction,
  statrCompleteMatchAction,
  updateMatchPlayerScoreFromCricAPIAction,
  initMatchSquadFromCricAPIAction,
} from './redux';
import {fetchMatchListAction, getMatchData} from '../Match/redux';
import {
  fetchTournamentListAction,
  getTournamentData,
} from '../Tournament/redux';
import {isListEmpty} from 'common/util';
import {FantasyDropDown, StatusMessage} from 'common/components';
import './AdminProcess.styles.scss';
import LoadingOverlay from 'react-loading-overlay';
import FantasyNotice from './components/FantasyNotice';

const AdminProcess = () => {
  const processProps = getAdminProcessData();
  const lockTournament = lockTournamentAction();
  const unLockTournament = unLockTournamentAction();
  const processScoreByMatch = processScoreByMatchAction();
  const processRanking = processRankingAction();
  const updateplayerScoreCric = updateMatchPlayerScoreFromCricAPIAction();
  const initmatchSquadCric = initMatchSquadFromCricAPIAction();
  const matchProps = getMatchData();
  const tournamentProps = getTournamentData();
  const fetchMatchList = fetchMatchListAction();
  const fetchTournaments = fetchTournamentListAction();
  const [tournamentId, setTournamentId] = useState();
  const [matchId, setMatchId] = useState();
  const initUserMatchData = initUserMatchDataAction();
  const statrCompleteMatch = statrCompleteMatchAction();
  const [lockStatus, setLockStatus] = useState('Lock');
  const [matchStatus, setMatchStatus] = useState('start');
  const [tabName, setTabName] = useState('beforematch');

  useEffect(() => {
    if (isListEmpty(matchProps.matchList)) {
      fetchMatchList();
    }
    if (isListEmpty(tournamentProps.tournamentList)) {
      fetchTournaments();
    }
  }, []);

  function getRecentAndUpcomingMatches() {
    const matches = matchProps.matchList;
    if (isListEmpty(matches)) return [];
    const fromTime = Date.now() - 178800000;
    const toTime = Date.now() + 178800000;
    const filtered = matches.filter((match: any) => {
      return match.matchTime > fromTime && match.matchTime < toTime;
    });
    return filtered;
  }

  const matchList = getRecentAndUpcomingMatches();

  function getTournamentId() {
    let toumntId = tournamentId;
    if (!tournamentId) {
      toumntId = tournamentProps.tournamentList[0].id;
    }
    return toumntId;
  }

  function getMatchId() {
    let mid = matchId;
    if (!mid) {
      mid = matchList[0].id;
    }
    return mid;
  }

  function LockUnlockTournament() {
    const tid = getTournamentId();
    const mid = getMatchId();
    if (lockStatus == 'Lock') {
      lockTournament(tid, mid);
    } else {
      unLockTournament(tid, mid);
    }
  }

  function renderActionHeader(text: string) {
    return (
      <div className="headerForAction">
        <Badge variant="info">{text}</Badge>
      </div>
    );
  }

  function renderMatchDropDown() {
    return (
      <FantasyDropDown
        list={matchList}
        onSelect={(value: any) => {
          setMatchId(value);
        }}
      />
    );
  }

  function updateMatchScoreviaCric() {
    updateplayerScoreCric(getMatchId());
  }

  function initMatchSquadviaCric() {
    initmatchSquadCric(getMatchId());
  }

  function renderMatchProcessActionForTournament(
    title: string,
    actionBtn: string,
    action: any
  ) {
    return (
      <div className="innerProcessContainer">
        {renderActionHeader(title)}
        <Row>
          <Col md={8}>{renderMatchDropDown()}</Col>
          <Col>
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={() => {
                action();
              }}>
              {actionBtn}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  function renderUpdatePlayerScoreViaCric() {
    const title = '** Update player SCore via Crick API';
    const actionbtn = 'Update Live Score';
    return (
      <Fragment>
        {renderMatchProcessActionForTournament(
          title,
          actionbtn,
          updateMatchScoreviaCric
        )}
      </Fragment>
    );
  }

  function renderInitMatchSquadViaCric() {
    const title = '** Init Match Squad via Crick API';
    const actionbtn = 'Init Match Squad';
    return (
      <Fragment>
        {renderMatchProcessActionForTournament(
          title,
          actionbtn,
          initMatchSquadviaCric
        )}
      </Fragment>
    );
  }

  function renderInitMatchForTournament() {
    return (
      <div className="innerProcessContainer">
        {renderActionHeader('3. Init Match Player Score For Match')}
        <Row>
          <Col md={8}>{renderMatchDropDown()}</Col>
          <Col>
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={() => {
                initUserMatchData(getMatchId(), 'match');
              }}>
              Init Match
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  function renderInitUserForMatch() {
    return (
      <div className="innerProcessContainer">
        {renderActionHeader('4. Init User Score For Match')}
        <Row>
          <Col md={8}>{renderMatchDropDown()}</Col>
          <Col>
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={() => {
                initUserMatchData(getMatchId(), 'user');
              }}>
              Init User
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  function renderMatchStartCompletedAction() {
    return (
      <div className="innerProcessContainer">
        {renderActionHeader('2. Start/Complete')}
        <Row>
          <Col>{renderMatchDropDown()}</Col>
          <Col>
            <FantasyDropDown
              list={[
                {name: 'Toss', id: 'Toss'},
                {name: 'Start', id: 'start'},
                {name: 'Complete', id: 'complete'},
              ]}
              onSelect={(value: any) => {
                setMatchStatus(value);
              }}
            />
          </Col>
          <Col>
            {' '}
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={() => {
                statrCompleteMatch(getMatchId(), matchStatus);
              }}>
              Start/Complete Match
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  function renderLockUnLockTournamentAction() {
    return (
      <div className="innerProcessContainer">
        {renderActionHeader('1. Lock Unlock Tournament')}
        <Row>
          <Col>
            <FantasyDropDown
              list={tournamentProps.tournamentList}
              onSelect={(value: any) => {
                setTournamentId(value);
              }}
            />
          </Col>
          <Col>
            <FantasyDropDown
              list={[
                {name: 'Lock', id: 'Lock'},
                {name: 'UnLock', id: 'UnLock'},
              ]}
              onSelect={(value: any) => {
                setLockStatus(value);
              }}
            />
          </Col>
          <Col>
            {' '}
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={() => LockUnlockTournament()}>
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  function renderProcessScoreCalculationByMatch() {
    return (
      <div className="innerProcessContainer">
        {renderActionHeader('5. Process Match Score at After Match')}
        <Row>
          <Col md={8}>{renderMatchDropDown()}</Col>
          <Col>
            {' '}
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={() => {
                processScoreByMatch(getMatchId());
              }}>
              Calculate Score
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  function renderCalculateRanking() {
    return (
      <div className="innerProcessContainer">
        {renderActionHeader('6. Calculate League Ranking')}
        <Row>
          <Col md={8}>
            <FantasyDropDown
              list={tournamentProps.tournamentList}
              onSelect={(value: any) => {
                setTournamentId(value);
              }}
            />
          </Col>
          <Col>
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={() => {
                processRanking(getTournamentId());
              }}>
              Calculate Ranking
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = processProps.hasError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }

  function renderHeader() {
    return <div className="headerProcess">Match Admin Process</div>;
  }

  function renderTabActionBtn(actionName: string, title: string) {
    const variant = tabName == actionName ? 'primary' : 'outline-primary';
    return (
      <Button
        variant={variant}
        className="mr-1 leagueTabMenuLink"
        onClick={() => setTabName(actionName)}>
        {title}
      </Button>
    );
  }

  function renderMatchActions() {
    return (
      <Form inline className="processMenuAction">
        {renderTabActionBtn('beforematch', 'Match Start')}
        {renderTabActionBtn('aftermatch', 'After Match')}
        {renderTabActionBtn('duringmatch', 'Live')}
        {renderTabActionBtn('notice', 'Manage Notice')}
      </Form>
    );
  }

  function renderBeforematchComponent() {
    return <div>{renderInitUserForMatch()}</div>;
  }

  function renderduringmatchComponent() {
    return (
      <div>
        {renderUpdatePlayerScoreViaCric()}
        {renderLockUnLockTournamentAction()}
        {renderMatchStartCompletedAction()}
        {renderInitMatchForTournament()}
        {renderInitMatchSquadViaCric()}
      </div>
    );
  }

  function renderAftergmatchComponent() {
    return (
      <div>
        {renderProcessScoreCalculationByMatch()}
        {renderCalculateRanking()}
      </div>
    );
  }

  function renderNotice() {
    return <FantasyNotice {...processProps} />;
  }

  function renderProcessComponents() {
    switch (tabName) {
      case 'beforematch':
        return renderBeforematchComponent();
      case 'duringmatch':
        return renderduringmatchComponent();
      case 'aftermatch':
        return renderAftergmatchComponent();
      case 'notice':
        return renderNotice();
      default:
        return renderBeforematchComponent();
    }
  }

  return (
    <div className="processContainer">
      <LoadingOverlay
        active={processProps.isLoading}
        spinner
        text="Loading Process Details ...">
        {renderHeader()}
        {renderStatusMessage(processProps.hasError, processProps.statusMessage)}
        {renderMatchActions()}
        {renderProcessComponents()}
      </LoadingOverlay>
    </div>
  );
};

export default AdminProcess;
