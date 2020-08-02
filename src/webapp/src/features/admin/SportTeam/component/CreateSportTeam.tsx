import React, {Fragment, useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';
import {FantasyDropDown} from 'common/components';
import {countryList} from 'common/components/FantasyDropDown';

const CreateSportTeam = ({createTeamAction}: CreateSportTeamProps) => {
  const [teamName, setTeamName] = useState('');
  const [countryName, setCountryName] = useState('INDIA');
  const [ownerName, setOwnerName] = useState('');

  function createTeam() {
    createTeamAction(teamName, countryName, ownerName);
  }
  function updateTeamDetails(text: string, type: number) {
    switch (type) {
      case 1:
        setTeamName(text);
        break;
      case 2:
        setOwnerName(text);
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
                value={teamName}
                placeholder="Team Name"
                aria-label="teamName"
                aria-describedby="basic-addon1"
                onChange={event => updateTeamDetails(event.target.value, 1)}
              />
            </Col>
            <Col>
              <FormControl
                value={ownerName}
                placeholder="Owner Name"
                aria-label="ownerName"
                aria-describedby="basic-addon2"
                onChange={event => updateTeamDetails(event.target.value, 2)}
              />
            </Col>
            <Col>
              <FantasyDropDown
                onSelect={(value: string) => updateTeamDetails(value, 3)}
                list={countryList}
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

export {CreateSportTeam};
