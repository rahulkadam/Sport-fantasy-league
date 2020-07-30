import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Helmet from 'react-helmet';

import {QuickPayForm} from './components/';

const QuickpayUnauth = () => {
  return (
    <Container fluid className="apgContainer">
      <Helmet>
        <title>Astro QuickPay</title>
      </Helmet>
      <Row className="mt-4">
        <span className="apg-h1">QuickPay</span>
      </Row>
      <Row className="apg-paragraph mt-3">
        Please enter your 10-digit Astro account number to view your latest bill
        and pay immediately.
      </Row>
      <Row className="mt-4">
        <Col className="px-0 pr-3" xs={10}>
          Account Number
        </Col>
        <Col className="apg-link text-right">Sample</Col>
      </Row>
      <QuickPayForm />
    </Container>
  );
};

export {QuickpayUnauth};
