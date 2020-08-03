import React, {Fragment, useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';
import {FantasyDropDown} from 'common/components';
import {countryList, PlayerTypeList} from 'common/components/FantasyDropDown';

const CreatePlayer = ({createPlayerAction}: CreatePlayerProps) => {
  const [playerName, setPlayerName] = useState('');
  const [countryName, setCountryName] = useState('INDIA');
  const [type, setType] = useState('BATSMAN');
  const [value, setValue] = useState('9');

  function createPlayer() {
    createPlayerAction(playerName, countryName, value, type);
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
      case 4:
        setCountryName(text);
        break;
    }
    return;
  }

  function renderCreatePlayer() {
    return (
      <Fragment>
        <div className="mb-3">
          <Row>
            <Col>Player Name</Col>
            <Col>Player Value</Col>
            <Col>Type</Col>
            <Col>Country</Col>
          </Row>
          <Row>
            <Col>
              <FormControl
                value={playerName}
                placeholder="Player Name"
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
              <FantasyDropDown
                onSelect={(value: string) => updatePlayerDetails(value, 3)}
                list={PlayerTypeList}
              />
            </Col>
            <Col>
              <FantasyDropDown
                onSelect={(value: string) => updatePlayerDetails(value, 4)}
                list={countryList}
              />
            </Col>
          </Row>
        </div>
        <Button variant="primary" onClick={() => createPlayer()}>
          Create Player
        </Button>
      </Fragment>
    );
  }

  return <div>{renderCreatePlayer()}</div>;
};

export {CreatePlayer};
