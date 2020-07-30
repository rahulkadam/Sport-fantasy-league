import React, {Fragment, useState} from 'react';
import {Form, Row, Col} from 'react-bootstrap';

import {InputAccountNumber} from '..';
import {APGButton} from '../../../../common/components';
import history from 'common/config/history';

const QuickPayForm = () => {
  const [accountNumber, setAccountNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  function validateAccountNumber(accountNumber: string) {
    setAccountNumber(accountNumber);
    if (accountNumber.length === 10) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  function redirectToBillPage() {
    history.push(`/billviewu?accountNumber=${accountNumber}`);
  }

  function submitForm(event: React.SyntheticEvent) {
    event.preventDefault();
    if (isValid) {
      redirectToBillPage();
    } else {
      console.log('Invalid cannot redirect');
    }
  }

  return (
    <Fragment>
      <Row className="mt-2" xs={12} md={8}>
        <Col className="px-0">
          <InputAccountNumber
            accountNumber={accountNumber}
            onAccountNumberChange={validateAccountNumber}
          />
        </Col>
      </Row>
      <Row className="mt-4" xs={12} md={8}>
        <APGButton
          title="Continue"
          isDisabled={!isValid}
          onClick={submitForm}
        />
      </Row>
    </Fragment>
  );
};

export {QuickPayForm};
