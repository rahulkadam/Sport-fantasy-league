import React, {Fragment} from 'react';
import {Col, Row} from 'react-bootstrap';

import './BillDetails.styles.scss';

const BillDetails = () => {
  // TODO: Make it render dynamically based on data
  return (
    <div className="billDetailsContainer">
      <Row className="billDetailRow">
        <Col>Account number</Col>
        <Col className="billDetailValue">0987654321 (Active)</Col>
      </Row>
      <Row className="billDetailRow">
        <Col>Account name</Col>
        <Col className="billDetailValue">LEE***UNG</Col>
      </Row>
      <Row className="billDetailRow">
        <Col>Overdue charges</Col>
        <Col className="billDetailValue">RM0.00</Col>
      </Row>
      <Row className="billDetailRow">
        <Col>New charges</Col>
        <Col className="billDetailValue">RM0.00</Col>
      </Row>
    </div>
  );
};

export {BillDetails};
