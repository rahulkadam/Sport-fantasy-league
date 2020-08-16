import React, {Fragment, useState} from 'react';
import {Button, FormControl} from 'react-bootstrap';

const CreateTeam = ({createTeamAction}: CreateTeamProps) => {
  const [teamName, setTeamName] = useState('');

  function createTeam() {
    createTeamAction(teamName);
  }
  function updateTeamName(teamNameTxt: string) {
    setTeamName(teamNameTxt);
  }

  function renderCreateTeam() {
    return (
      <Fragment>
        Welcome to Fantasy League , you do not have any team, Please Create Team
        <div className="mb-3">
          <FormControl
            value={teamName}
            placeholder="Team Name"
            aria-label="teamName"
            aria-describedby="basic-addon1"
            onChange={event => updateTeamName(event.target.value)}
          />
        </div>
        <Button
          variant="primary"
          onClick={() => createTeam()}
          disabled={teamName.length == 0}>
          Create Team
        </Button>
      </Fragment>
    );
  }

  return <div>{renderCreateTeam()}</div>;
};

export {CreateTeam};
