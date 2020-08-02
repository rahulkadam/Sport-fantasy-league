import React, {Fragment, useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';
import {FantasyDropDown} from 'common/components';

const CreateMatch = (props: CreateMatchProps) => {
  const createMatchAction = props.createMatchAction;
  const venueList = props.venueList;
  const teamList = props.teamList;
  const tournamentList = props.tournamentList;
  const [description, setDescription] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [countryName, setCountryName] = useState('INDIA');
  const [type, setType] = useState('BATSMAN');
  const [matchTime, setMatchTime] = useState('');

  function createMatch() {
    createMatchAction(description, countryName, type, matchTime);
  }
  function updateMatchDetails(text: string, type: number) {
    switch (type) {
      case 1:
        setDescription(text);
        break;
      case 2:
        setMatchTime(text);
        break;
      case 3:
        setType(text);
        break;
      case 3:
        setCountryName(text);
        break;
    }
    return;
  }

  const tournamentList1 = [
    {id: 1, name: 'IPL'},
    {id: 2, name: 'IPL 20'},
    {id: 3, name: 'IPL19'},
  ];

  function onSelectTournament(value: string) {
    console.log('selected tournamenr', value);
  }

  function onSelectTeam1(value: string) {
    console.log('selected team1', value);
  }

  function onSelectTeam2(value: string) {
    console.log('selected team2', value);
  }

  function onSelectVenue(value: string) {
    console.log('selected venue', value);
  }

  function renderCreateMatch() {
    return (
      <Fragment>
        <div className="mb-3">
          <Row>
            <Col>Tournament</Col>
            <Col>Home Team</Col>
            <Col>Away Team</Col>
            <Col>Venue</Col>
            <Col>Match Name</Col>
            <Col>Time</Col>
          </Row>
          <Row>
            <Col>
              <FantasyDropDown
                onSelect={onSelectTournament}
                list={tournamentList1}
              />
            </Col>
            <Col>
              <FantasyDropDown onSelect={onSelectTeam1} list={teamList} />
            </Col>
            <Col>
              <FantasyDropDown onSelect={onSelectTeam2} list={teamList} />
            </Col>
            <Col>
              <FantasyDropDown onSelect={onSelectVenue} list={venueList} />
            </Col>
            <Col>
              <FormControl
                value={description}
                placeholder="Description"
                aria-label="matchName"
                aria-describedby="basic-addon1"
                onChange={event => updateMatchDetails(event.target.value, 1)}
              />
            </Col>
            <Col>
              <FormControl
                value={matchTime}
                placeholder="Match Time"
                aria-label="matchTime"
                aria-describedby="basic-addon2"
                onChange={event => updateMatchDetails(event.target.value, 2)}
              />
            </Col>
          </Row>
        </div>
        <Button variant="primary" onClick={() => createMatch()}>
          Create Match
        </Button>
      </Fragment>
    );
  }

  return <div>{renderCreateMatch()}</div>;
};

export {CreateMatch};
