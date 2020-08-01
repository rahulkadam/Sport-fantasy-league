import React, {Fragment, useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';

const CreateTournament = ({createTournamentAction}: CreateTournamentProps) => {
  const [tournamentName, setTournamentName] = useState('');
  const [countryName, setCountryName] = useState('');
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

  function renderCreateTeam() {
    return (
      <Fragment>
        Welcome to Fantasy League , you do not have any team, Please Create Team
        <div className="mb-3">
          <Row>
            <Col>
              <FormControl
                value={tournamentName}
                placeholder="Team Name"
                aria-label="teamName"
                aria-describedby="basic-addon1"
                onChange={event =>
                  updateTournamentDetails(event.target.value, 1)
                }
              />
            </Col>
            <Col>
              <select
                className="form-control"
                onChange={event =>
                  updateTournamentDetails(event.target.value, 3)
                }>
                <option>CRICKET</option>
              </select>
            </Col>
            <Col>
              <FormControl
                value={countryName}
                placeholder="Country Name"
                aria-label="countryName"
                aria-describedby="basic-addon3"
                onChange={event =>
                  updateTournamentDetails(event.target.value, 3)
                }
              />
            </Col>
          </Row>
        </div>
        <Button variant="primary" onClick={() => createTeam()}>
          Create Team
        </Button>
      </Fragment>
    );
  }

  return <div>{renderCreateTeam()}</div>;
};

export {CreateTournament};
