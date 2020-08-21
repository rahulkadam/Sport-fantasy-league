import React, {useEffect, Fragment, useState} from 'react';
import {Row, Col, Button, Form, Badge} from 'react-bootstrap';
import {
  lockTournamentAction,
  unLockTournamentAction,
  processScoreByMatchAction,
  processRankingAction,
  getAdminProcessData,
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
  const [lockStatus, setLockStatus] = useState('Lock');

  useEffect(() => {
    if (isListEmpty(matchProps.matchList)) {
      fetchMatchList();
    }
    if (isListEmpty(tournamentProps.tournamentList)) {
      fetchTournaments();
    }
  }, []);

  function LockUnlockTournament() {
    if (!tournamentId) {
      setTournamentId(tournamentProps.tournamentList[0].id);
    }
    if (!matchId) {
      setMatchId(matchProps.matchList[0].id);
    }
    if (lockStatus == 'Lock') {
      lockTournament(tournamentId, matchId);
    } else {
      unLockTournament(tournamentId, matchId);
    }
  }

  function renderLockUnLockTournamentAction() {
    return (
      <div className="innerProcessContainer">
        <div>Lock/UnLock Tournament</div>
        <Row>
          <Col>Tournament</Col>
          <Col>Lock/UnLock</Col>
          <Col>Action</Col>
        </Row>
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
              list={matchProps.matchList}
              onSelect={(value: any) => {
                setMatchId(value);
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
        <Row>
          <Col>Match</Col>
          <Col>Action</Col>
        </Row>
        <Row>
          <Col>
            <FantasyDropDown
              list={matchProps.matchList}
              onSelect={(value: any) => {
                setMatchId(value);
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
                  processScoreByMatch(matchProps.matchList[0].id);
                } else {
                  processScoreByMatch(matchId);
                }
              }}>
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  function renderCalculateRanking() {
    return (
      <div className="innerProcessContainer">
        <Row>
          <Col>
            <Badge variant="info"> Calculate League Ranking </Badge>
          </Col>
          <Col>
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
              Submit
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

  return (
    <div className="processContainer">
      <LoadingOverlay
        active={processProps.isLoading}
        spinner
        text="Loading Process Details ...">
        {renderStatusMessage(processProps.hasError, processProps.statusMessage)}
        {renderLockUnLockTournamentAction()}
        {renderProcessScoreCalculationByMatch()}
        {renderCalculateRanking()}
        <Row>
          <Col>Add Notice About Match</Col>
        </Row>
      </LoadingOverlay>
    </div>
  );
};

export default AdminProcess;
