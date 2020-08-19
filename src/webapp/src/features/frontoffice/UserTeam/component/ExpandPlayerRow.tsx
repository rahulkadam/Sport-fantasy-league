import React, {Fragment} from 'react';
import {Col, Row} from 'react-bootstrap';

const ExpandPlayerRow = ({data}: any) => {
  return (
    <div className="expandPlayerContainer">
      <Row className="nameColumn">
        <Col>Team</Col>
        <Col>Country</Col>
      </Row>
      <Row>
        <Col>{data.teamsNameList}</Col>
        <Col>{data.country}</Col>
      </Row>
    </div>
  );
};

export {ExpandPlayerRow};
