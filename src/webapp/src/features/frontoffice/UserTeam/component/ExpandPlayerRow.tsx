import React, {Fragment} from 'react';
import {Col, Row} from 'react-bootstrap';

const ExpandPlayerRow = ({data}: any) => {
  return (
    <Fragment>
      <Row>
        <Col>Name</Col>
        <Col>Team</Col>
        <Col>Value</Col>
      </Row>
      <Row>
        <Col>{data.name}</Col>
        <Col>{data.teamsNameList}</Col>
        <Col>{data.value}</Col>
      </Row>
    </Fragment>
  );
};

export {ExpandPlayerRow};
