import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Helmet from 'react-helmet';
import {BillDetails} from './components/BillDetails/BillDetails';
import {APGButton} from '../../common/components';
import history from '../../common/config/history';

const BillViewUnauth = () => {
  return (
    <Container fluid className="apgContainer">
      <Helmet>
        <title>Astro QuickPay - Pay Bill</title>
      </Helmet>
      <Row className="mt-4">
        <span className="apg-h1">Pay Bill</span>
      </Row>
      <Row className="apg-paragraph mt-3">
        You have no outstanding charges. Thank you for your prompt payment and
        ongoing support.
      </Row>
      <Row className="mt-4 raised">
        <Container className="px-0">
          <BillDetails />
        </Container>
      </Row>
      <Row className="mt-4">
        <APGButton
          title={'Pay Now'}
          isDisabled={false}
          onClick={() => history.push('/payment')}
        />
      </Row>
    </Container>
  );
};

export {BillViewUnauth};
