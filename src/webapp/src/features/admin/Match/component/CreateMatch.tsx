import React, {Fragment, useEffect, useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';
import {FantasyDropDown} from 'common/components';
import {getVenueData, fetchVenueListAction} from '../../venue/redux';
import DateTimePicker from 'react-datetime-picker';
import {getIdFromSelectList} from 'common/util';

const CreateMatch = (props: CreateMatchProps) => {
  const createMatchAction = props.createMatchAction;
  const teamList = props.teamList;
  const tournamentList = props.tournamentList;
  const venueProps = getVenueData();
  const venueList = venueProps.venueList;
  const fetchVenueList = fetchVenueListAction();
  const [description, setDescription] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [homeTeamId, setHomeTeamId] = useState('');
  const [awayTeamId, setAwayTeamId] = useState('');
  const [venueId, setVenueId] = useState('');
  const [countryName, setCountryName] = useState('INDIA');
  const [type, setType] = useState('BATSMAN');
  const [matchTime, setMatchTime] = useState(new Date());
  useEffect(() => {
    if (!venueList || venueList.length == 0) {
      fetchVenueList();
    }
  }, []);

  function createMatch() {
    const isoMatchTime = matchTime.toISOString();
    const defaultHomeTeamId = getIdFromSelectList(homeTeamId, teamList);
    const defaultAwayTeamId = getIdFromSelectList(awayTeamId, teamList);
    const defaultTournamentId = getIdFromSelectList(
      tournamentId,
      tournamentList
    );
    const defaultVenueId = getIdFromSelectList(venueId, venueList);
    const requestObject = {
      description: description,
      homeTeamId: defaultHomeTeamId,
      awayTeamId: defaultAwayTeamId,
      tournamentId: defaultTournamentId,
      venueId: defaultVenueId,
      isoMatchTime: isoMatchTime,
    };
    createMatchAction(requestObject);
  }
  function updateMatchDetails(text: any, type: number) {
    switch (type) {
      case 1:
        setTournamentId(text);
        break;
      case 2:
        setHomeTeamId(text);
        break;
      case 3:
        setAwayTeamId(text);
        break;
      case 4:
        setDescription(text);
        break;
      case 5:
        setMatchTime(text);
        break;
      case 6:
        setVenueId(text);
        break;
    }
    return;
  }

  function renderCreateMatch() {
    return (
      <Fragment>
        <div className="mb-3">
          <Row className="columnheader">
            <Col>Tournament</Col>
            <Col>Home Team</Col>
            <Col>Away Team</Col>
          </Row>
          <Row className="columnheader">
            <Col>
              <FantasyDropDown
                onSelect={(value: any) => {
                  updateMatchDetails(value, 1);
                }}
                list={tournamentList}
              />
            </Col>
            <Col>
              <FantasyDropDown
                onSelect={(value: any) => {
                  updateMatchDetails(value, 2);
                }}
                list={teamList}
              />
            </Col>
            <Col>
              <FantasyDropDown
                onSelect={(value: any) => {
                  updateMatchDetails(value, 3);
                }}
                list={teamList}
              />
            </Col>
          </Row>
          <Row className="columnheader">
            <Col>Match Name</Col>
            <Col>Time</Col>
            <Col>Venue</Col>
          </Row>
          <Row className="columnheader">
            <Col>
              <FormControl
                value={description}
                placeholder="Description"
                aria-label="matchName"
                aria-describedby="basic-addon1"
                onChange={event => updateMatchDetails(event.target.value, 4)}
              />
            </Col>
            <Col>
              <DateTimePicker
                onChange={(value: any) => {
                  updateMatchDetails(value, 5);
                }}
                disableClock
                value={matchTime}
              />
            </Col>
            <Col>
              <FantasyDropDown
                onSelect={(value: any) => {
                  updateMatchDetails(value, 6);
                }}
                list={venueList}
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
