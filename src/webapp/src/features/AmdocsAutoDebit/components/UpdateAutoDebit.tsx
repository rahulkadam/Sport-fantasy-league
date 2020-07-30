import React from 'react';
import {Button, Form} from 'react-bootstrap';

const UpdateAutoDebit = () => {
  return (
    <div>
      <Form>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Credit/Debit Card</Form.Label>
          <Form.Control
            type="text"
            placeholder="Card Number"
            value="123456*******1234"
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control type="text" placeholder="MM/YY" value="12/25" />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Name on Card</Form.Label>
          <Form.Control
            type="text"
            placeholder="Mandatory"
            value="Rah** Kad**"
          />
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

export {UpdateAutoDebit};
