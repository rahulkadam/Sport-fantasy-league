import React, {Fragment, useEffect, useState} from 'react';
import {Button, Row, Col} from 'react-bootstrap';
import {FantasyDropDown} from 'common/components';
import {getIdFromSelectList} from 'common/util';

const UpdateTeam = (props: UpdateTeamProps) => {
  const tournamentList = props.tournamentList;
  const teamList = props.teamList;
  const addTournamentToTeam = props.addTournamentToTeamAction;
  const loadTournamentData = props.loadTournamentList;
  const [teamId, setTeamId] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  useEffect(() => {
    if (!tournamentList || tournamentList.length == 0) {
      loadTournamentData();
    }
  }, []);

  function updateTeamWithTournament() {
    const tournamentDefaultId = getIdFromSelectList(
      tournamentId,
      tournamentList
    );
    const teamDefaultId = getIdFromSelectList(teamId, teamList);
    addTournamentToTeam(teamDefaultId, tournamentDefaultId);
  }
  function updateTeamDetails(text: string, type: number) {
    switch (type) {
      case 1:
        setTeamId(text);
        break;
      case 2:
        setTournamentId(text);
        break;
    }
    return;
  }

  function renderUpdateTeam() {
    return (
      <Fragment>
        <div className="mb-3">
          <Row>
            <Col>Select Team</Col>
            <Col>Select Tournament</Col>
          </Row>
          <Row>
            <Col>
              <FantasyDropDown
                onSelect={(value: string) => updateTeamDetails(value, 1)}
                list={teamList}
              />
            </Col>
            <Col>
              <FantasyDropDown
                onSelect={(value: string) => updateTeamDetails(value, 2)}
                list={tournamentList}
              />
            </Col>
          </Row>
        </div>
        <Button variant="primary" onClick={() => updateTeamWithTournament()}>
          Add Team To Tournament
        </Button>
      </Fragment>
    );
  }

  return <div>{renderUpdateTeam()}</div>;
};

export {UpdateTeam};
