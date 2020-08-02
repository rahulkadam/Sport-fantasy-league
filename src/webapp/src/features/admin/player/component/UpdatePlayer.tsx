import React, {Fragment, useEffect, useState} from 'react';
import {Button, Row, Col} from 'react-bootstrap';
import {FantasyDropDown} from 'common/components';

const UpdatePlayer = (props: UpdatePlayerProps) => {
  const playerList = props.playerList;
  const teamList = props.teamList;
  const addPlayerToTeam = props.addPlayerToTeamAction;
  const loadTeamData = props.loadTeamList;
  const [teamId, setTeamId] = useState('');
  const [playerId, setPlayerId] = useState('');
  useEffect(() => {
    if (!teamList || teamList.length == 0) {
      loadTeamData();
    }
  }, []);
  function updatePlayerWithTeam() {
    let playerDefaultId = playerId;
    let teamDefaultId = teamId;
    if (playerDefaultId.length == 0) {
      playerDefaultId = playerList[0].id;
    }

    if (teamDefaultId.length == 0) {
      teamDefaultId = teamList[0].id;
    }
    addPlayerToTeam(teamDefaultId, playerDefaultId);
  }
  function updatePlayerDetails(text: string, type: number) {
    switch (type) {
      case 1:
        setTeamId(text);
        break;
      case 2:
        setPlayerId(text);
        break;
    }
    return;
  }

  function renderPlayerTeam() {
    return (
      <Fragment>
        <div className="mb-3">
          <Row>
            <Col>Select Player</Col>
            <Col>Select Team</Col>
          </Row>
          <Row>
            <Col>
              <FantasyDropDown
                onSelect={(value: string) => updatePlayerDetails(value, 1)}
                list={playerList}
              />
            </Col>
            <Col>
              <FantasyDropDown
                onSelect={(value: string) => updatePlayerDetails(value, 2)}
                list={teamList}
              />
            </Col>
          </Row>
        </div>
        <Button variant="primary" onClick={() => updatePlayerWithTeam()}>
          Add Player To Team
        </Button>
      </Fragment>
    );
  }

  return <div>{renderPlayerTeam()}</div>;
};

export {UpdatePlayer};