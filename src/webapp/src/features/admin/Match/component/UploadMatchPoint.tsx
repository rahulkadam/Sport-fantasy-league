import React, {Fragment, useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';
import {FantasyDropDown} from 'common/components';

const UploadMatchPoint = (props: UploadMatchPointProps) => {
  const uploadMatchResultAction = props.uploadMatchResultAction;
  const playerList = props.playerList;
  const teamList = props.teamList;
  const matchList = props.matchList;
  const tournamentList = props.tournamentList;
  const [description, setDescription] = useState('');
  const [countryName, setCountryName] = useState('INDIA');
  const [type, setType] = useState('BATSMAN');
  const [matchTime, setMatchTime] = useState('');

  function uploadMatchResult() {
    uploadMatchResultAction(description, countryName, type, matchTime);
  }
  function updateMatchResultDetails(text: string, type: number) {
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
    console.log('selected Match', value);
  }

  function onSelectMatch(value: string) {
    console.log('selected Match', value);
  }

  function onSelectPlayer(value: string) {
    console.log('selected team2', value);
  }

  function renderUploadMatchPointForPlayer() {
    return (
      <Fragment>
        <div className="mb-3">
          <Row>
            <Col>
              <FantasyDropDown onSelect={onSelectMatch} list={matchList} />
            </Col>
            <Col>
              <FantasyDropDown onSelect={onSelectPlayer} list={playerList} />
            </Col>
            <Col>
              <FormControl
                value={description}
                placeholder="Point Score"
                aria-label="pointscore"
                aria-describedby="basic-addon1"
                onChange={event =>
                  updateMatchResultDetails(event.target.value, 1)
                }
              />
            </Col>
            <Col>
              <FormControl
                value={description}
                placeholder="Run Score"
                aria-label="runscore"
                aria-describedby="basic-addon2"
                onChange={event =>
                  updateMatchResultDetails(event.target.value, 1)
                }
              />
            </Col>
            <Col>
              <FormControl
                value={description}
                placeholder="wicket"
                aria-label="wickets"
                aria-describedby="basic-addon3"
                onChange={event =>
                  updateMatchResultDetails(event.target.value, 1)
                }
              />
            </Col>
            <Col>
              <FormControl
                value={description}
                placeholder="catches"
                aria-label="catches"
                aria-describedby="basic-addon4"
                onChange={event =>
                  updateMatchResultDetails(event.target.value, 1)
                }
              />
            </Col>
          </Row>
        </div>
        <Button variant="primary" onClick={() => uploadMatchResult()}>
          Upload Match Details
        </Button>
      </Fragment>
    );
  }

  return <div>{renderUploadMatchPointForPlayer()}</div>;
};

export {UploadMatchPoint};
