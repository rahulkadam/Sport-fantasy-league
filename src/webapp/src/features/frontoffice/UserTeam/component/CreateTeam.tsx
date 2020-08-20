import React, {Fragment, useState} from 'react';
import {Button, FormControl} from 'react-bootstrap';
import {StatusMessage} from '../../../../common/components';

const CreateTeam = ({createTeamAction}: CreateTeamProps) => {
  const [teamName, setTeamName] = useState('');

  function createTeam() {
    createTeamAction(teamName);
  }
  function updateTeamName(teamNameTxt: string) {
    setTeamName(teamNameTxt);
  }

  const createTeamMsg = 'Welcome to Fantasy League , Please create team';

  function renderCreateTeam() {
    const teambtnDisable = teamName.length == 0;
    return (
      <Fragment>
        <div className="mb-3 createTeamContainer">
          <StatusMessage type={'primary'} text={createTeamMsg} />
          <FormControl
            value={teamName}
            placeholder="Team Name"
            aria-label="teamName"
            aria-describedby="basic-addon1"
            onChange={event => updateTeamName(event.target.value)}
          />
          <div className="createTeamBtn">
            <Button
              variant={teambtnDisable ? 'secondary' : 'primary'}
              onClick={() => createTeam()}
              disabled={teambtnDisable}>
              Create Team
            </Button>
          </div>
        </div>
      </Fragment>
    );
  }

  return <div>{renderCreateTeam()}</div>;
};

export {CreateTeam};
