import React, {Fragment} from 'react';
import {Col, Row} from 'react-bootstrap';

const ExpandPlayerRow = ({data}: any) => {
  return (
    <Fragment>
      <Row>
        <Col>Team</Col>
        <Col>Country</Col>
      </Row>
      <Row>
        <Col>{data.teamsNameList}</Col>
        <Col>{data.country}</Col>
      </Row>
    </Fragment>
  );
};

export {ExpandPlayerRow};
