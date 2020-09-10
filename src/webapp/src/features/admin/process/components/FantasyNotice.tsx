import React, {useEffect, useState} from 'react';
import {isListEmpty} from 'common/util';
import {
  addNoticeAction,
  clearCacheByNameAction,
  disableNoticeAction,
  fetchNoticeListAction,
  toggleTaskSchedularAction,
  updateFantasyConfigAction,
} from '../redux';
import {Badge, Button, Col, FormControl, Row} from 'react-bootstrap';
import {FantasyDropDown} from 'common/components';

const FantasyNotice = (props: AdminProcess) => {
  const addNotice = addNoticeAction();
  const disableNotice = disableNoticeAction();
  const fetchNotice = fetchNoticeListAction();
  const toggleSchedularAction = toggleTaskSchedularAction();
  const removeCache = clearCacheByNameAction();
  const updateFantasyConfig = updateFantasyConfigAction();
  const noticeList = props.notice;
  const [noticeId, setNoticeId] = useState();
  const [message, setMessage] = useState('');
  const [cacheName, setCacheName] = useState('');
  const [configKey, setConfigKey] = useState('');
  const [configValue, setConfigValue] = useState('');
  const cacheNameList = [
    {id: 'PlayerCache', name: 'PlayerCache'},
    {id: 'MatchCache', name: 'MatchCache'},
    {id: 'FantasyCache', name: 'FantasyCache'},
    {id: 'LiveScoreCache', name: 'LiveScoreCache'},
    {id: 'TOURNAMENT_CACHE', name: 'TOURNAMENT_CACHE'},
    {id: 'ALL', name: 'ALL'},
  ];

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

  function renderToggleTaskSchedular() {
    return (
      <div className="innerProcessContainer">
        {renderActionHeader('Task Schedular Enable Disable')}
        <Row>
          <Col>
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={() => {
                toggleSchedularAction();
              }}>
              Toggle Task Schedular
            </Button>
          </Col>
        </Row>
      </div>
    );
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

  function removeCachebyCacheName() {
    const cache = cacheName || cacheNameList[0].id;
    removeCache(cache);
  }

  function renderClearCacheByNameComponent() {
    return (
      <div className="innerProcessContainer">
        {renderActionHeader('Clear Cache By Name')}
        <Row>
          <Col md={8}>
            {' '}
            <FantasyDropDown
              list={cacheNameList}
              onSelect={(value: any) => {
                setCacheName(value);
              }}
            />
          </Col>
          <Col>
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={() => {
                removeCachebyCacheName();
              }}>
              Clear Cache
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  function renderUpdateFantasyConfig() {
    return (
      <div className="innerProcessContainer">
        {renderActionHeader('Update Fantasy Config')}
        (CRIC_API_KEY, CRIC_INFO_IPL_SERIES_ID, LIVE_DATA_PROVIDER)
        <Row>
          <Col md={4}>
            <FormControl
              value={configKey}
              placeholder="Key"
              onChange={event => setConfigKey(event.target.value)}
            />
          </Col>
          <Col md={4}>
            <FormControl
              value={configValue}
              placeholder="Value"
              onChange={event => setConfigValue(event.target.value)}
            />
          </Col>
          <Col>
            <Button
              variant="outline-primary"
              className="mr-2"
              disabled={configKey.length == 0 || configValue.length == 0}
              onClick={() => {
                updateFantasyConfig(configKey, configValue);
              }}>
              Update Config
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
      {renderToggleTaskSchedular()}
      {renderClearCacheByNameComponent()}
      {renderUpdateFantasyConfig()}
    </div>
  );
};

export default FantasyNotice;
