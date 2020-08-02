import React, {Fragment, useEffect, useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';
import {FantasyDropDown} from 'common/components';

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
  const [countryName, setCountryName] = useState('INDIA');
  const [type, setType] = useState('BATSMAN');
  const [matchTime, setMatchTime] = useState('');
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
    uploadMatchResultAction(description, countryName, type, matchTime);
  }
  function updateMatchResultDetails(text: string, type: number) {
    switch (type) {
      case 1:
        setDescription(text);
        break;
      case 2:
        setMatchTime(text);
        break;
      case 3:
        setType(text);
        break;
      case 3:
        setCountryName(text);
        break;
    }
    return;
  }
  function onSelectTournament(value: string) {
    console.log('selected Match', value);
  }

  function onSelectMatch(value: string) {
    console.log('selected Match', value);
  }

  function onSelectTeam(value: string) {
    console.log('selected team1', value);
  }

  function onSelectPlayer(value: string) {
    console.log('selected team2', value);
  }

  function renderUploadMatchResult() {
    return (
      <Fragment>
        <div className="mb-3">
          <Row>
            <Col>Tournament</Col>
            <Col>Match</Col>
            <Col>Winner Team</Col>
            <Col>Player of the Match</Col>
            <Col>Comments</Col>
          </Row>
          <Row>
            <Col>
              <FantasyDropDown
                onSelect={onSelectTournament}
                list={tournamentList}
              />
            </Col>
            <Col>
              <FantasyDropDown onSelect={onSelectMatch} list={matchList} />
            </Col>
            <Col>
              <FantasyDropDown onSelect={onSelectTeam} list={teamList} />
            </Col>
            <Col>
              <FantasyDropDown onSelect={onSelectPlayer} list={playerList} />
            </Col>
            <Col>
              <FormControl
                value={description}
                placeholder="Description"
                aria-label="matchName"
                aria-describedby="basic-addon1"
                onChange={event =>
                  updateMatchResultDetails(event.target.value, 1)
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
