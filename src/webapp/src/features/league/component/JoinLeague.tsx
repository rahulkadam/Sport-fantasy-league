import React, {useState} from 'react';
import {Button, FormControl} from 'react-bootstrap';

const JoinLeague = () => {
  const [leagueCode, setLeagueCode] = useState('');

  function changeLeagueCode(leagueCode: string) {
    setLeagueCode(leagueCode);
  }

  function joinLeague() {
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
