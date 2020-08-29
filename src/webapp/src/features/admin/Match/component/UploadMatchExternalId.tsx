import React, {Fragment, useEffect, useState} from 'react';
import {Button, FormControl, Row, Col} from 'react-bootstrap';
import {FantasyDropDown} from 'common/components';
import {getIdFromSelectList} from '../../../../common/util';

const UploadMatchExternalId = (props: UploadExternalIdProps) => {
  const updateExternalId = props.updateexternIdAction;
  const matchList = props.matchList;
  const [externalId, setExternalId] = useState('');
  const [matchId, setMatchId] = useState('');

  function uploadExternalIdResult() {
    const defaultMatchId = getIdFromSelectList(matchId, matchList);
    updateExternalId(defaultMatchId, externalId);
  }

  function renderUpdateMatchExternalId() {
    return (
      <Fragment>
        <div className="mb-3">
          <Row>
            <Col>Match</Col>
            <Col>External Id</Col>
          </Row>
          <Row>
            <Col>
              <FantasyDropDown
                onSelect={(value: string) => {
                  setMatchId(value);
                }}
                list={matchList}
              />
            </Col>
            <Col>
              <FormControl
                value={externalId}
                placeholder="External Id"
                aria-label="matchName"
                aria-describedby="basic-addon1"
                onChange={event => setExternalId(event.target.value)}
              />
            </Col>
          </Row>
        </div>
        <Button
          variant="primary"
          disabled={externalId.length == 0}
          onClick={() => uploadExternalIdResult()}>
          Update External Match Id
        </Button>
      </Fragment>
    );
  }

  return <div>{renderUpdateMatchExternalId()}</div>;
};

export {UploadMatchExternalId};
