import React from 'react';
import {Row, Col} from 'react-bootstrap';

const AdminProcess = () => {
  return (
    <div>
      Admin Process
      <Row>
        <Col>Calculate Points</Col>
      </Row>
      <Row>
        <Col>Calculate Ranking</Col>
      </Row>
      <Row>
        <Col>Lock Team for Match</Col>
      </Row>
      <Row>
        <Col>UnLock Team for Match</Col>
      </Row>
      <Row>
        <Col>Add Notice About Match</Col>
      </Row>
    </div>
  );
};

export default AdminProcess;
