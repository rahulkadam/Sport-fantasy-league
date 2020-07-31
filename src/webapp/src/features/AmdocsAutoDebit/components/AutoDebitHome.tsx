import React from 'react';
import {Tab, Row, Col, Nav} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import {RegisterAutoDebit} from './RegisterAutoDebit';
import {UpdateAutoDebit} from './UpdateAutoDebit';
import {TransactionHistory} from './TransactionHistory';
import {CreditCardAutoDebit} from './CardDetailsAutoDebit';
import {AutoDebitOverview} from './AutoDebitOverview';

const AutoDebitHome = () => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const tabName = query.get('tab') || 'overview';

  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey={tabName}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="overview">Overview</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="register">Register</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="viewCard">View Card</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="updateCard">Update Card</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="paymentHistory">History</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="overview">
                <AutoDebitOverview />
              </Tab.Pane>
              <Tab.Pane eventKey="register">
                <RegisterAutoDebit />
              </Tab.Pane>
              <Tab.Pane eventKey="viewCard">
                <CreditCardAutoDebit />
              </Tab.Pane>
              <Tab.Pane eventKey="updateCard">
                <UpdateAutoDebit />
              </Tab.Pane>
              <Tab.Pane eventKey="paymentHistory">
                <TransactionHistory />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export {AutoDebitHome};
