import React, {useEffect, useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';
import {getIdFromSelectList} from '../../../common/util';
import {fetchTournamentListAction} from '../../admin/Tournament/redux';
import {FantasyDropDown} from '../../../common/components';

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
    console.log('league joinged with code ' + leagueName);
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

  return (
    <div>
      Welcome to Fantasy League
      <div className="mb-3">
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
      <Button variant="primary" onClick={() => createLeagueAction()}>
        Create League
      </Button>
    </div>
  );
};

export {CreateLeague};
