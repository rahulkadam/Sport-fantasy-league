import React from 'react';
import {Col, Row, Table} from 'react-bootstrap';
import {Icon} from '../../../common/styles/Icon';

const CreditCardAutoDebit = () => {
  return (
    <div>
      Show Credit Card details of user
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Card Number</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>123456****1234</td>
              <td>Rahul Kadam</td>
              <td>
                <Row>
                  <Col md={2}>
                    <Icon name="edit" />
                  </Col>
                  <Col md={10}>
                    <Icon name="delete" />
                  </Col>
                </Row>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>987654****1234</td>
              <td>Steve Smith</td>
              <td>
                <Row>
                  <Col md={2}>
                    <Icon name="edit" />
                  </Col>
                  <Col md={10}>
                    <Icon name="delete" />
                  </Col>
                </Row>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export {CreditCardAutoDebit};
