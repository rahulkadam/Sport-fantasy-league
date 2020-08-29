import React, {Fragment, useEffect, useState} from 'react';
import {Button, Row, Col, Form} from 'react-bootstrap';
import {FantasyDropDown} from 'common/components';
import {getIdFromSelectList} from 'common/util';

const UpdatePlayerExternalId = (props: UpdatePlayerProps) => {
  const playerList = props.playerList;
  const updateExternalId = props.updateExternalId;
  const [externalId, setExternalId] = useState('');
  const [playerId, setPlayerId] = useState('');

  function updatePlayerWithExternalId() {
    const playerDefaultId = getIdFromSelectList(playerId, playerList);
    updateExternalId(playerDefaultId, externalId);
  }
  function updatePlayerDetails(text: string, type: number) {
    switch (type) {
      case 1:
        setPlayerId(text);
        break;
      case 2:
        setExternalId(text);
        break;
    }
    return;
  }

  function renderPlayerTeam() {
    return (
      <Fragment>
        <div className="mb-3">
          <Row>
            <Col>Select Player</Col>
            <Col>External Id</Col>
          </Row>
          <Row>
            <Col>
              <FantasyDropDown
                onSelect={(value: string) => updatePlayerDetails(value, 1)}
                list={playerList}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                size="sm"
                placeholder="External Id"
                onChange={(e: any) => setExternalId(e.target.value)}
                value={externalId}
              />
            </Col>
          </Row>
        </div>
        <Button
          variant="primary"
          disabled={externalId.length == 0}
          onClick={() => updatePlayerWithExternalId()}>
          Add External ID To Player
        </Button>
      </Fragment>
    );
  }

  return <div>{renderPlayerTeam()}</div>;
};

export {UpdatePlayerExternalId};
