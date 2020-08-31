import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {StatusMessage} from '../../../../common/components';

const JoinLeague = ({data, userid}: JoinLeagueProps) => {
  const [leagueCode, setLeagueCode] = useState('');
  const joinLeagueAction = data && data.joinleague;

  function changeLeagueCode(leagueCode: string) {
    setLeagueCode(leagueCode);
  }

  function joinLeague() {
    joinLeagueAction(leagueCode, userid);
  }

  const joinleageMsg =
    'Ask friends to share league code with you to directly enter into private league';

  const isInvalid = leagueCode.length == 0;

  return (
    <div className="createLeagueContainer">
      <div className="mb-3">
        <StatusMessage type={'info'} text={joinleageMsg} />
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
