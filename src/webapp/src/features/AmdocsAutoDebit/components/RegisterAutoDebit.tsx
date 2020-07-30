import React from 'react';
import {Form, Button} from 'react-bootstrap';

const RegisterAutoDebit = () => {
  return (
    <div>
      <Form>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Credit/Debit Card</Form.Label>
          <Form.Control type="text" placeholder="Card Number" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control type="text" placeholder="MM/YY" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Name on Card</Form.Label>
          <Form.Control type="text" placeholder="Mandatory" />
        </Form.Group>
        <Button variant="secondary" type="submit">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export {RegisterAutoDebit};
