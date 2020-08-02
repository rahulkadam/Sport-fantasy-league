import React, {Fragment, useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';
import {FantasyDropDown} from 'common/components';
import {countryList, sportList} from 'common/components/FantasyDropDown';

const CreateTournament = ({createTournamentAction}: CreateTournamentProps) => {
  const [tournamentName, setTournamentName] = useState('');
  const [countryName, setCountryName] = useState('INDIA');
  const [sportName, setSportName] = useState('CRICKET');

  function createTeam() {
    createTournamentAction(tournamentName, countryName, sportName);
  }
  function updateTournamentDetails(text: string, type: number) {
    switch (type) {
      case 1:
        setTournamentName(text);
        break;
      case 2:
        setSportName(text);
        break;
      case 3:
        setCountryName(text);
        break;
    }
    return;
  }

  function renderCreateTournament() {
    return (
      <Fragment>
        <div className="mb-3">
          <Row>
            <Col>Create Tournament</Col>
          </Row>
          <Row>
            <Col>
              <FormControl
                value={tournamentName}
                placeholder="Tournament Name"
                onChange={event =>
                  updateTournamentDetails(event.target.value, 1)
                }
              />
            </Col>
            <Col>
              <FantasyDropDown
                onSelect={(value: string) => updateTournamentDetails(value, 2)}
                list={sportList}
              />
            </Col>
            <Col>
              <FantasyDropDown
                onSelect={(value: string) => updateTournamentDetails(value, 3)}
                list={countryList}
              />
            </Col>
          </Row>
        </div>
        <Button variant="primary" onClick={() => createTeam()}>
          Create Tournament
        </Button>
      </Fragment>
    );
  }

  return <div>{renderCreateTournament()}</div>;
};

export {CreateTournament};
