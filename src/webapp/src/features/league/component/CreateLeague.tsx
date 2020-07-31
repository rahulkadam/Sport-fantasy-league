import React, {useState} from 'react';
import {Button, FormControl} from 'react-bootstrap';

const CreateLeague = ({data}: CreateLeagueProps) => {
  const [leagueName, setLeagueName] = useState('');
  const joinLeagueAction = data && data.joinleague;

  function changeLeagueName(leagueCode: string) {
    setLeagueName(leagueCode);
  }

  function createLeague() {
    joinLeagueAction(leagueName);
    console.log('league joinged with code ' + leagueName);
  }

  return (
    <div>
      Welcome to Fantasy League
      <div className="mb-3">
        <FormControl
          value={leagueName}
          placeholder="League Name"
          aria-label="leagueName"
          aria-describedby="basic-addon1"
          onChange={event => changeLeagueName(event.target.value)}
        />
      </div>
      <Button variant="primary" onClick={() => createLeague()}>
        Create League
      </Button>
    </div>
  );
};

export {CreateLeague};
