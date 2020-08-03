import React, {Fragment} from 'react';
import './StatusMessage.styles.scss';
import {Alert} from 'react-bootstrap';

const StatusMessage = ({text, type}: FantasyStatusMessageProps) => {
  function renderMessage() {
    if (!text || text.length == 0) {
      return;
    }
    let modalType = 'info';
    switch (type) {
      case 'error':
        modalType = 'danger';
        break;
      default:
        modalType = type;
        break;
    }
    return (
      <Alert key={type} variant={modalType}>
        {text}
      </Alert>
    );
  }
  return <Fragment>{renderMessage()}</Fragment>;
};

export {StatusMessage};
