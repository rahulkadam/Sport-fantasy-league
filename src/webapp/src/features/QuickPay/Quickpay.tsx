import React, {useState} from 'react';
import {Button, FormControl} from 'react-bootstrap';
import {Helmet} from 'react-helmet';
import {GetLoginStoreData} from '../Authentication/redux';
import history from 'common/config/history';

const Quickpay = () => {
  const [inputText, setInputText] = useState('');

  function changeAccountNumber(value: string) {
    setInputText(value);
  }

  const loggedUser = GetLoginStoreData();

  function submitQuickPay(value: string) {
    history.push(`/billview?accountNumber=${inputText}`);
  }

  return (
    <div>
      <Helmet>
        <title>QuickPay</title>
      </Helmet>
      Welcome to APG {loggedUser.username}
      <div className="mb-3">
        <FormControl
          value={inputText}
          placeholder="Account Number"
          aria-label="accountNumber"
          aria-describedby="basic-addon1"
          onChange={event => changeAccountNumber(event.target.value)}
        />
      </div>
      <Button variant="primary" onClick={() => submitQuickPay(inputText)}>
        View Bill
      </Button>
    </div>
  );
};

export {Quickpay};
