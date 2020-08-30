import React, {useEffect, useState} from 'react';
import {isListEmpty} from 'common/util';
import {
  addNoticeAction,
  disableNoticeAction,
  fetchNoticeListAction,
} from '../redux';
import {Badge, Button, Col, FormControl, Row} from 'react-bootstrap';
import {FantasyDropDown} from 'common/components';

const FantasyNotice = (props: AdminProcess) => {
  const addNotice = addNoticeAction();
  const disableNotice = disableNoticeAction();
  const fetchNotice = fetchNoticeListAction();
  const noticeList = props.notice;
  const [noticeId, setNoticeId] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isListEmpty(noticeList)) {
      fetchNotice();
    }
  }, []);

  function renderNoticeDropDown() {
    return (
      <FantasyDropDown
        list={noticeList}
        onSelect={(value: any) => {
          setNoticeId(value);
        }}
      />
    );
  }

  function renderActionHeader(text: string) {
    return (
      <div className="headerForAction">
        <Badge variant="info">{text}</Badge>
      </div>
    );
  }

  function removeNotice() {
    const newNoticeId = noticeId || noticeList[0].id;
    disableNotice(newNoticeId);
  }

  function renderRemoveNotice() {
    return (
      <div className="innerProcessContainer">
        {renderActionHeader('Remove Notice')}
        <Row>
          <Col md={8}>{renderNoticeDropDown()}</Col>
          <Col>
            <Button
              variant="outline-primary"
              className="mr-2"
              disabled={noticeList.length == 0}
              onClick={() => {
                removeNotice();
              }}>
              Remove Notice
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  function renderAddFantasyNotice() {
    return (
      <div className="innerProcessContainer">
        {renderActionHeader('Add Notice')}
        <Row>
          <Col md={8}>
            <FormControl
              value={message}
              placeholder="Notice Message"
              onChange={event => setMessage(event.target.value)}
            />
          </Col>
          <Col>
            <Button
              variant="outline-primary"
              className="mr-2"
              disabled={message.length == 0}
              onClick={() => {
                addNotice(message);
              }}>
              Add Notice
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div>
      {renderAddFantasyNotice()}
      {renderRemoveNotice()}
    </div>
  );
};

export default FantasyNotice;
