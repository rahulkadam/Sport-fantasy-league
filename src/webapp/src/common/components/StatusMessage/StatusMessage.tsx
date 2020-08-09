import React, {useState, Fragment} from 'react';
import './StatusMessage.styles.scss';
import {Alert} from 'react-bootstrap';

const StatusMessage = ({text, type}: FantasyStatusMessageProps) => {
  const [show, setShow] = useState(true);

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
      <Fragment>
        {show && (
          <Alert
            key={type}
            onClose={() => setShow(false)}
            dismissible
            variant={modalType}>
            {text}
          </Alert>
        )}
      </Fragment>
    );
  }
  return <Fragment>{renderMessage()}</Fragment>;
};

export {StatusMessage};
