import React, {Fragment} from 'react';
import {Col, Row} from 'react-bootstrap';

const ExpandLeagueRow = ({data}: any) => {
  return (
    <Fragment>
      <Row>
        <Col>Name</Col>
        <Col>Code</Col>
        <Col>User Count</Col>
      </Row>
      <Row>
        <Col>{data.name}</Col>
        <Col>{data.leagueCode}</Col>
        <Col>{data.totalUserCount}</Col>
      </Row>
    </Fragment>
  );
};

export {ExpandLeagueRow};
