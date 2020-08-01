import React, {Fragment, useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';

const CreatePlayer = ({createPlayerAction}: CreatePlayerProps) => {
  const [playerName, setPlayerName] = useState('');
  const [countryName, setCountryName] = useState('INDIA');
  const [type, setType] = useState('BATSMAN');
  const [value, setValue] = useState('9');

  function createPlayer() {
    createPlayerAction(playerName, countryName, type, value);
  }
  function updatePlayerDetails(text: string, type: number) {
    switch (type) {
      case 1:
        setPlayerName(text);
        break;
      case 2:
        setValue(text);
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

  function renderCreatePlayer() {
    return (
      <Fragment>
        Welcome to Fantasy League , you do not have any team, Please Create Team
        <div className="mb-3">
          <Row>
            <Col>
              <FormControl
                value={playerName}
                placeholder="Team Name"
                aria-label="teamName"
                aria-describedby="basic-addon1"
                onChange={event => updatePlayerDetails(event.target.value, 1)}
              />
            </Col>
            <Col>
              <FormControl
                value={value}
                placeholder="Player Value"
                aria-label="playervalue"
                aria-describedby="basic-addon2"
                onChange={event => updatePlayerDetails(event.target.value, 2)}
              />
            </Col>
            <Col>
              <select
                className="form-control"
                onChange={event => updatePlayerDetails(event.target.value, 3)}>
                <option>BATSMAN</option>
                <option>BOWLER</option>
                <option>ALLROUNDER</option>
                <option>WICKETKEEPER</option>
              </select>
            </Col>
            <Col>
              <select
                className="form-control"
                onChange={event => updatePlayerDetails(event.target.value, 4)}>
                <option>INDIA</option>
                <option>AUSTRALIA</option>
                <option>SRILANKA</option>
              </select>
            </Col>
          </Row>
        </div>
        <Button variant="primary" onClick={() => createPlayer()}>
          Create Team
        </Button>
      </Fragment>
    );
  }

  return <div>{renderCreatePlayer()}</div>;
};

export {CreatePlayer};
