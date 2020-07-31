import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {Form, Row, Col} from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import {
  GetQuickPayStoreData,
  FetchBillAction,
  ClearBillAction,
} from '../../redux';

const BillView = () => {
  const fetchBillAction = FetchBillAction();
  const quickPayData = GetQuickPayStoreData();
  const clearBill = ClearBillAction();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const accountNumber = query.get('accountNumber');

  useEffect(() => {
    fetchBillAction(accountNumber);
  }, [accountNumber, fetchBillAction]);

  useEffect(
    () => () => {
      clearBill();
    },
    [clearBill]
  );

  useEffect(() => {
    console.log('component will Mount, render everytime');
  });

  return (
    <div>
      <LoadingOverlay
        active={quickPayData.isFetching}
        spinner
        text="Loading your Bill Details...">
        <Form.Group as={Row} controlId="accountNumber">
          <Form.Label column sm="2">
            Account Number
          </Form.Label>
          <Col sm="10">
            <Form.Control
              plaintext
              readOnly
              value={quickPayData.accountNumber}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="accountName">
          <Form.Label column sm="2">
            Account Name
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={quickPayData.username} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="currentBalance">
          <Form.Label column sm="2">
            Current Balance
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly value={quickPayData.totalAmount} />
          </Col>
        </Form.Group>
      </LoadingOverlay>
    </div>
  );
};

export default BillView;
