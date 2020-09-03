import React, {Fragment, useEffect, useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';
import {FantasyDropDown} from 'common/components';
import {getIdFromSelectList} from '../../../../common/util';

const UploadMatchResult = (props: UploadMatchResultProps) => {
  const uploadMatchResultAction = props.uploadMatchResultAction;
  const playerList = props.playerList;
  const teamList = props.teamList;
  const matchList = props.matchList;
  const tournamentList = props.tournamentList;
  const loadTournamentList = props.loadTournamentList;
  const loadPlayerList = props.loadPlayerList;
  const loadTeamList = props.loadTeamList;
  const [description, setDescription] = useState('');
  const [winnerTeamId, setWinnerTeamId] = useState('');
  const [matchPlayerId, setMatchPlayerId] = useState('');
  const [matchId, setMatchId] = useState('');
  useEffect(() => {
    if (!teamList || teamList.length == 0) {
      loadTeamList();
    }
    if (!playerList || playerList.length == 0) {
      loadPlayerList();
    }

    if (!tournamentList || tournamentList.length == 0) {
      loadTournamentList();
    }
  }, []);
  function uploadMatchResult() {
    const defaultwinnerTeam = getIdFromSelectList(winnerTeamId, teamList);
    const defaultMatchPlayerId = getIdFromSelectList(matchPlayerId, playerList);
    const defaultMatchId = getIdFromSelectList(matchId, matchList);
    const requestObj = {
      description: description,
      team_winner_id: defaultwinnerTeam,
      matchId: defaultMatchId,
      matchPlayerId: defaultMatchPlayerId,
    };
    uploadMatchResultAction(requestObj);
  }
  function updateMatchResultDetails(text: string, type: number) {
    switch (type) {
      case 1:
        setMatchId(text);
        break;
      case 2:
        setWinnerTeamId(text);
        break;
      case 3:
        setMatchPlayerId(text);
        break;
      case 4:
        setDescription(text);
        break;
    }
    return;
  }

  function renderUploadMatchResult() {
    return (
      <Fragment>
        <div className="mb-3">
          <Row className="columnheader">
            <Col>Tournament</Col>
            <Col>Match</Col>
            <Col>Winner Team</Col>
          </Row>
          <Row className="columnheader">
            <Col>
              <FantasyDropDown
                onSelect={(value: string) => {
                  updateMatchResultDetails(value, 6);
                }}
                list={tournamentList}
              />
            </Col>
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
                list={teamList}
              />
            </Col>
          </Row>
          <Row className="columnheader">
            <Col>Player of the Match</Col>
            <Col>Comments</Col>
          </Row>
          <Row className="columnheader">
            <Col>
              <FantasyDropDown
                onSelect={(value: string) => {
                  updateMatchResultDetails(value, 3);
                }}
                list={playerList}
              />
            </Col>
            <Col>
              <FormControl
                value={description}
                placeholder="Description"
                aria-label="matchName"
                aria-describedby="basic-addon1"
                onChange={event =>
                  updateMatchResultDetails(event.target.value, 4)
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

  return <div>{renderUploadMatchResult()}</div>;
};

export {UploadMatchResult};
