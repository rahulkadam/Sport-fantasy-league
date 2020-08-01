import React, {Fragment, useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';

const CreateVenue = ({createVenueAction}: CreateVenueProps) => {
  const [venueName, setVenueName] = useState('');
  const [countryName, setCountryName] = useState('INDIA');
  const [city, setCity] = useState('');

  function createVenue() {
    createVenueAction(venueName, countryName, city);
  }
  function updateVenueDetails(text: string, type: number) {
    switch (type) {
      case 1:
        setVenueName(text);
        break;
      case 2:
        setCity(text);
        break;
      case 3:
        setCountryName(text);
        break;
    }
    return;
  }

  function renderCreateVenue() {
    return (
      <Fragment>
        Welcome to Fantasy League , you do not have any team, Please Create Team
        <div className="mb-3">
          <Row>
            <Col>
              <FormControl
                value={venueName}
                placeholder="Team Name"
                aria-label="teamName"
                aria-describedby="basic-addon1"
                onChange={event => updateVenueDetails(event.target.value, 1)}
              />
            </Col>
            <Col>
              <FormControl
                value={city}
                placeholder="City"
                aria-label="city"
                aria-describedby="basic-addon2"
                onChange={event => updateVenueDetails(event.target.value, 2)}
              />
            </Col>
            <Col>
              <select
                className="form-control"
                onChange={event => updateVenueDetails(event.target.value, 3)}>
                <option>INDIA</option>
                <option>AUSTRALIA</option>
              </select>
            </Col>
          </Row>
        </div>
        <Button variant="primary" onClick={() => createVenue()}>
          Create Team
        </Button>
      </Fragment>
    );
  }

  return <div>{renderCreateVenue()}</div>;
};

export {CreateVenue};
