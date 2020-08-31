import React, {useEffect, useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';
import {getIdFromSelectList} from '../../../../common/util';
import {fetchTournamentListAction} from '../../../admin/Tournament/redux';
import {FantasyDropDown, StatusMessage} from '../../../../common/components';

const CreateLeague = ({
  createLeague,
  tournamentList,
  userId,
}: CreateLeagueProps) => {
  const [leagueName, setLeagueName] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const fetchTournamentList = fetchTournamentListAction();
  useEffect(() => {
    if (!tournamentList || tournamentList.length == 0) {
      fetchTournamentList();
    }
  }, []);
  function changeLeagueName(leagueCode: string) {
    setLeagueName(leagueCode);
  }

  function createLeagueAction() {
    const defaultTournamentId = getIdFromSelectList(
      tournamentId,
      tournamentList
    );
    const request: CreateLeagueRequestObj = {
      name: leagueName,
      createByUserId: userId + '',
      tournamentId: defaultTournamentId,
    };

    createLeague(request);
  }

  function updateCreateLeagueDetails(value: string, types: number) {
    switch (types) {
      case 1:
        setTournamentId(value);
        break;
      case 2:
        setLeagueName(value);
        break;
    }
  }

  const createleagueMsg = 'Create Private league and share code with friends';

  const isInvalid = leagueName.length == 0;

  return (
    <div className="createLeagueContainer">
      <div className="mb-3">
        <StatusMessage type={'info'} text={createleagueMsg} />
        <Row>
          <Col>
            <FantasyDropDown
              onSelect={(value: string) => {
                updateCreateLeagueDetails(value, 1);
              }}
              list={tournamentList}
            />
          </Col>
          <Col>
            <FormControl
              value={leagueName}
              placeholder="League Name"
              aria-label="leagueName"
              aria-describedby="basic-addon1"
              onChange={event =>
                updateCreateLeagueDetails(event.target.value, 2)
              }
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
