import React, {useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';
import {StatusMessage} from 'common/components';
import {GA_League_Event} from 'common/config';

const CreateLeague = ({createLeague}: CreateLeagueProps) => {
  const [leagueName, setLeagueName] = useState('');

  function createLeagueAction() {
    GA_League_Event('Create League');
    const request: CreateLeagueRequestObj = {
      name: leagueName,
    };
    createLeague(request);
  }

  const createleagueMsg = 'Create Private league and share code with friends';

  const isInvalid = leagueName.length == 0;

  return (
    <div className="createLeagueContainer">
      <div className="mb-3">
        <StatusMessage type={'info'} text={createleagueMsg} />
        <Row>
          <Col>
            <FormControl
              value={leagueName}
              placeholder="League Name"
              aria-label="leagueName"
              aria-describedby="basic-addon1"
              onChange={event => setLeagueName(event.target.value)}
            />
          </Col>
        </Row>
      </div>
      <Button
        variant={isInvalid ? 'secondary' : 'info'}
        onClick={() => createLeagueAction()}
        disabled={isInvalid}>
        Create League
      </Button>
    </div>
  );
};

export {CreateLeague};
