import React, {Fragment, useEffect, useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';
import {FantasyDropDown} from 'common/components';
import {getIdFromSelectList} from '../../../../common/util';

const UploadMatchPoint = (props: UploadMatchPointProps) => {
  const uploadMatchResultAction = props.uploadMatchResultAction;
  const playerList = props.playerList;
  const teamList = props.teamList;
  const matchList = props.matchList;
  const tournamentList = props.tournamentList;
  const loadPlayerList = props.loadPlayerList;
  const loadMatchList = props.loadMatchList;
  const loadTeamList = props.loadTeamList;
  const [matchId, setMatchId] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [points, setPoints] = useState('0');
  const [runs, setRuns] = useState('0');
  const [wickets, setWickets] = useState('0');
  const [catches, setCatches] = useState('0');
  useEffect(() => {
    if (!matchList || matchList.length == 0) {
      loadMatchList();
    }
    if (!teamList || teamList.length == 0) {
      loadTeamList();
    }
    if (!playerList || playerList.length == 0) {
      loadPlayerList();
    }
  }, []);
  function uploadMatchResult() {
    const defaultMatchId = getIdFromSelectList(matchId, matchList);
    const defaultPlayerId = getIdFromSelectList(playerId, playerList);
    const matchPointRequestObject = {
      matchId: defaultMatchId,
      playerId: defaultPlayerId,
      points: points,
      runs: runs,
      wickets: wickets,
      catches: catches,
    };
    uploadMatchResultAction(matchPointRequestObject);
  }
  function updateMatchResultDetails(text: string, type: number) {
    switch (type) {
      case 1:
        setMatchId(text);
        break;
      case 2:
        setPlayerId(text);
        break;
      case 3:
        setPoints(text);
        break;
      case 4:
        setRuns(text);
        break;
      case 5:
        setWickets(text);
        break;
      case 6:
        setCatches(text);
        break;
    }
    return;
  }
  function renderUploadMatchPointForPlayer() {
    return (
      <Fragment>
        <div className="mb-3">
          <Row>
            <Col>Match</Col>
            <Col>Player</Col>
            <Col>Point</Col>
          </Row>
          <Row>
            <Col>
              <FantasyDropDown
                onSelect={(value: string) => {
                  updateMatchResultDetails(value, 1);
                }}
                list={matchList}
              />
            </Col>
            <Col>
              <FantasyDropDown
                onSelect={(value: string) => {
                  updateMatchResultDetails(value, 2);
                }}
                list={playerList}
              />
            </Col>
            <Col>
              <FormControl
                value={points}
                placeholder="Point Score"
                aria-label="pointscore"
                aria-describedby="basic-addon1"
                onChange={event =>
                  updateMatchResultDetails(event.target.value, 3)
                }
              />
            </Col>
          </Row>
          <Row>
            <Col>Runs</Col>
            <Col>Wickets</Col>
            <Col>Catches</Col>
          </Row>
          <Row>
            <Col>
              <FormControl
                value={runs}
                placeholder="Run Score"
                aria-label="runscore"
                aria-describedby="basic-addon2"
                onChange={event =>
                  updateMatchResultDetails(event.target.value, 4)
                }
              />
            </Col>
            <Col>
              <FormControl
                value={wickets}
                placeholder="wicket"
                aria-label="wickets"
                aria-describedby="basic-addon3"
                onChange={event =>
                  updateMatchResultDetails(event.target.value, 5)
                }
              />
            </Col>
            <Col>
              <FormControl
                value={catches}
                placeholder="catches"
                aria-label="catches"
                aria-describedby="basic-addon4"
                onChange={event =>
                  updateMatchResultDetails(event.target.value, 6)
                }
              />
            </Col>
          </Row>
        </div>
        <Button variant="primary" onClick={() => uploadMatchResult()}>
          Upload Match Details
        </Button>
      </Fragment>
    );
  }

  return <div>{renderUploadMatchPointForPlayer()}</div>;
};

export {UploadMatchPoint};
