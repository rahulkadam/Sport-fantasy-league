import React, {useEffect, Fragment} from 'react';
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
import {FantasyDropDown} from '../../../common/components';
import './AdminProcess.styles.scss';

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

  useEffect(() => {
    if (isListEmpty(matchProps.matchList)) {
      fetchMatchList();
    }
    if (isListEmpty(tournamentProps.tournamentList)) {
      fetchTournaments();
    }
  }, []);

  function LockUnlockTournament() {
    console.log('Lock Unlock TOurnament');
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
              onSelect={() => {
                console.log('addmin');
              }}
            />
          </Col>
          <Col>
            <FantasyDropDown
              list={[
                {name: 'Lock', id: 'Lock'},
                {name: 'UnLock', id: 'UnLock'},
              ]}
              onSelect={() => {
                console.log('Lock Unlock');
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
              onSelect={() => {
                console.log('addmin');
              }}
            />
          </Col>
          <Col>
            {' '}
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={() => processScoreByMatch()}>
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
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={() => processScoreByMatch()}>
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="processContainer">
      {renderLockUnLockTournamentAction()}
      {renderProcessScoreCalculationByMatch()}
      {renderCalculateRanking()}
      <Row>
        <Col>Add Notice About Match</Col>
      </Row>
    </div>
  );
};

export default AdminProcess;
