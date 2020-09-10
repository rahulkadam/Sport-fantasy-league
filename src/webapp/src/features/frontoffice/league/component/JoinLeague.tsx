import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {StatusMessage} from 'common/components';
import {GA_League_Event} from 'common/config';

const JoinLeague = ({data}: JoinLeagueProps) => {
  const [leagueCode, setLeagueCode] = useState('');
  const joinLeagueAction = data && data.joinleague;

  function changeLeagueCode(leagueCode: string) {
    setLeagueCode(leagueCode);
  }

  function joinLeague() {
    GA_League_Event('Join League');
    joinLeagueAction(leagueCode);
  }

  const joinleageMsg = 'Enter league code shared by friend to Join league';

  const isInvalid = leagueCode.length == 0;

  return (
    <div className="createLeagueContainer">
      <div className="mb-3">
        <div className="secondaryLeagueTitle">{joinleageMsg}</div>
        <Form.Control
          value={leagueCode}
          placeholder="IPL League Code"
          aria-label="leagueCode"
          aria-describedby="basic-addon1"
          onChange={event => changeLeagueCode(event.target.value)}
        />
      </div>
      <div className="createLeagueBtn">
        <Button
          variant={isInvalid ? 'secondary' : 'info'}
          onClick={() => joinLeague()}
          disabled={isInvalid}>
          Join League
        </Button>
      </div>
    </div>
  );
};

export {JoinLeague};
