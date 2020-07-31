import React, {Fragment} from 'react';
import './StatusMessage.styles.scss';

const StatusMessage = ({text, type}: FantasyStatusMessageProps) => {
  function renderMessage() {
    return <Fragment>{text}</Fragment>;
  }
  return <div className={type}>{renderMessage()}</div>;
};

export {StatusMessage};
