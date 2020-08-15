import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {StatusMessage} from '../../../common/components';

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

  return (
    <div>
      Welcome to Fantasy League
      <div className="mb-3">
        <StatusMessage type={'primary'} text={joinleageMsg} />
        <Form.Control
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
