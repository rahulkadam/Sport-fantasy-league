import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import Login from '../../../Authentication/components';
import {getAccessToken} from '../../../../API';
const UserHomePageBoard = () => {
  const accessToken = getAccessToken();

  function renderNoAUthUserActionLinkCard() {
    return (
      <div className="userLinkCardContainer">
        <Login />
      </div>
    );
  }

  return <div>{!accessToken && renderNoAUthUserActionLinkCard()}</div>;
};

export default UserHomePageBoard;
