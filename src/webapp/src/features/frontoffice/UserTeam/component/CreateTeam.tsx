import React, {Fragment, useState} from 'react';
import {Button, FormControl} from 'react-bootstrap';
import {StatusMessage} from 'common/components';
import {GA_Team_Event} from 'common/config';

const CreateTeam = ({createTeamAction}: CreateTeamProps) => {
  const [teamName, setTeamName] = useState('');

  function createTeam() {
    GA_Team_Event('Create Team');
    createTeamAction(teamName);
  }
  function updateTeamName(teamNameTxt: string) {
    setTeamName(teamNameTxt);
  }

  const createTeamMsg =
    'Welcome to IPL Fantasy League , Please create Your Fantasy team';

  function renderCreateTeam() {
    const teambtnDisable = teamName.length == 0;
    return (
      <Fragment>
        <div className="mb-3 createTeamContainer">
          <StatusMessage type={'info'} text={createTeamMsg} />
          <FormControl
            value={teamName}
            placeholder="Team Name i.e MI-Paltan, RCB_United,SuperIPLFan"
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
