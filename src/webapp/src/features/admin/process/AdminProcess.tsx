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
} from './redux';
import {fetchMatchListAction, getMatchData} from '../Match/redux';
import {
  fetchTournamentListAction,
  getTournamentData,
} from '../Tournament/redux';
import {isListEmpty} from '../../../common/util';
import {FantasyDropDown, StatusMessage} from '../../../common/components';
import './AdminProcess.styles.scss';
import LoadingOverlay from 'react-loading-overlay';

const AdminProcess = () => {
  const processProps = getAdminProcessData();
  const lockTournament = lockTournamentAction();
  const unLockTournament = unLockTournamentAction();
  const processScoreByMatch = processScoreByMatchAction();
  const processRanking = processRankingAction();
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

  useEffect(() => {
    if (isListEmpty(matchProps.matchList)) {
      fetchMatchList();
    }
    if (isListEmpty(tournamentProps.tournamentList)) {
      fetchTournaments();
    }
  }, []);

  function LockUnlockTournament() {
    let toumntId = tournamentId;
    if (!tournamentId) {
      toumntId = tournamentProps.tournamentList[0].id;
    }
    if (!matchId) {
      setMatchId(matchProps.matchList[0].id);
    }
    if (lockStatus == 'Lock') {
      lockTournament(toumntId, matchId);
    } else {
      unLockTournament(toumntId, matchId);
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
        list={matchProps.matchList}
        onSelect={(value: any) => {
          setMatchId(value);
        }}
      />
    );
  }
  function renderInitMatchForTournament() {
    return (
      <div className="innerProcessContainer">
        {renderActionHeader('3. Init Match Player Score For Tournament')}
        <Row>
          <Col md={8}>{renderMatchDropDown()}</Col>
          <Col>
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={() => {
                if (!matchId) {
                  initUserMatchData(matchProps.matchList[0].id, 'match');
                } else {
                  initUserMatchData(matchId, 'match');
                }
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
                if (!matchId) {
                  initUserMatchData(matchProps.matchList[0].id, 'user');
                } else {
                  initUserMatchData(matchId, 'user');
                }
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
                if (!matchId) {
                  statrCompleteMatch(matchProps.matchList[0].id, matchStatus);
                } else {
                  statrCompleteMatch(matchId, matchStatus);
                }
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
                if (!matchId) {
                  processScoreByMatch(matchProps.matchList[0].id);
                } else {
                  processScoreByMatch(matchId);
                }
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
                if (!tournamentId) {
                  processRanking(tournamentProps.tournamentList[0].id);
                } else {
                  processRanking(tournamentId);
                }
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

  return (
    <div className="processContainer">
      <LoadingOverlay
        active={processProps.isLoading}
        spinner
        text="Loading Process Details ...">
        {renderHeader()}
        {renderStatusMessage(processProps.hasError, processProps.statusMessage)}
        {renderLockUnLockTournamentAction()}
        {renderMatchStartCompletedAction()}
        {renderInitMatchForTournament()}
        {renderInitUserForMatch()}
        {renderProcessScoreCalculationByMatch()}
        {renderCalculateRanking()}
      </LoadingOverlay>
    </div>
  );
};

export default AdminProcess;
