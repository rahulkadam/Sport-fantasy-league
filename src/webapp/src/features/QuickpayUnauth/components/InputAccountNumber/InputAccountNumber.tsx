import React, {SyntheticEvent, useState} from 'react';
import Form from 'react-bootstrap/Form';

import './InputAccountNumber.styles.scss';

const accountNumberRegEx = /^[0-9]*$/;

const InputAccountNumber = ({
  onAccountNumberChange,
  accountNumber,
}: InputAccountNumberPropTypes) => {
  function onChange({target}: React.ChangeEvent<HTMLInputElement>) {
    if (accountNumberRegEx.test(target.value)) {
      onAccountNumberChange(target.value);
    }
  }

  return (
    <Form.Control
      name="astroAccountNumber"
      type="tel"
      placeholder="10-digit"
      maxLength={10}
      pattern="[0-9]{0,10}"
      inputMode="numeric"
      onChange={onChange}
      value={accountNumber}
    />
  );
};

export {InputAccountNumber};
