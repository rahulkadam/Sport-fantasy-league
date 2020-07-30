import React, {useState} from 'react';
import {Button, FormControl} from 'react-bootstrap';

const JoinLeague = ({data}: JoinLeagueProps) => {
  const [leagueCode, setLeagueCode] = useState('');
  const joinLeagueAction = data && data.joinleague;

  function changeLeagueCode(leagueCode: string) {
    setLeagueCode(leagueCode);
  }

  function joinLeague() {
    joinLeagueAction(leagueCode);
    console.log('league joinged with code ' + leagueCode);
  }

  return (
    <div>
      Welcome to Fantasy League
      <div className="mb-3">
        <FormControl
          value={leagueCode}
          placeholder="IPL League Code"
          aria-label="leagueCode"
          aria-describedby="basic-addon1"
          onChange={event => changeLeagueCode(event.target.value)}
        />
      </div>
      <Button variant="primary" onClick={() => joinLeague()}>
        Join League
      </Button>
    </div>
  );
};

export {JoinLeague};
