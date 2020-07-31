import React, {useEffect, Fragment} from 'react';
import {
  getLeagueData,
  fetchUserLeagueListAction,
  joinLeagueAction,
} from './redux';
import {LeagueList} from './component/LeagueList';
import {JoinLeague} from './component/JoinLeague';
import {CreateLeague} from './component/CreateLeague';
import {Col, Nav, Row, Tab} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import './League.styles.scss';

const League = () => {
  const leagueStoreData = getLeagueData();
  const leagueObjdata = leagueStoreData.data || {};
  const userleagueList = leagueObjdata.userleagueList || [];
  const fetchUserLeagueList = fetchUserLeagueListAction();
  const joinLeague = joinLeagueAction();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const tabName = query.get('tab') || 'overview';

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchUserLeagueList();
  }, []);
  useEffect(() => {
    console.log('component will Mount, render everytime');
  });

  function renderLeagueOverview() {
    return (
      <Fragment>
        {userleagueList.length > 0 && (
          <LeagueList userleagueList={userleagueList} />
        )}
        {userleagueList.length == 0 && (
          <JoinLeague data={{joinleague: joinLeague}} />
        )}
      </Fragment>
    );
  }

  function renderJoinLeague() {
    return <JoinLeague data={{joinleague: joinLeague}} />;
  }

  function renderCreateLeague() {
    return <CreateLeague data={{joinleague: joinLeague}} />;
  }

  function fetchTabConfig() {
    const config = [
      {
        key: 'overview',
        title: 'League Overview',
        renderfunction: renderLeagueOverview(),
      },
      {
        key: 'joinLeague',
        title: 'Join League',
        renderfunction: renderJoinLeague(),
      },
      {
        key: 'createLeague',
        title: 'Create League',
        renderfunction: renderCreateLeague(),
      },
    ];
    return config;
  }

  function renderflexLeftColum(key: string, title: string) {
    return (
      <Fragment>
        <Nav.Item>
          <Nav.Link eventKey={key}>{title}</Nav.Link>{' '}
        </Nav.Item>
      </Fragment>
    );
  }

  function renderLeftColumnPane() {
    const element: any = [];
    const configList = fetchTabConfig();
    configList.forEach(config => {
      element.push(renderflexLeftColum(config.key, config.title));
    });
    return (
      <Fragment>
        <Nav variant="pills" className="flex-column">
          {element}
        </Nav>
      </Fragment>
    );
  }

  function renderRightPaneColumn(key: string) {
    const element: any = [];
    const configList = fetchTabConfig();
    configList
      .filter(config => config.key == key)
      .forEach(config => {
        element.push(config.renderfunction);
      });
    return (
      <Fragment>
        <Tab.Pane eventKey={key}>{element}</Tab.Pane>
      </Fragment>
    );
  }

  function renderRightPage() {
    const element: any = [];
    const configList = fetchTabConfig();
    configList.forEach(config => {
      element.push(renderRightPaneColumn(config.key));
    });
    return (
      <Fragment>
        <Tab.Content>{element}</Tab.Content>
      </Fragment>
    );
  }

  function renderTabContainerForLeague() {
    return (
      <div>
        <Tab.Container id="left-tabs-example" defaultActiveKey={tabName}>
          <Row>
            <Col sm={3}>{renderLeftColumnPane()}</Col>
            <Col sm={9}>{renderRightPage()}</Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }

  function renderSuccessErrorDetails() {
    const statusClassName = leagueStoreData.hasError
      ? 'errorMessage'
      : 'successMessage';
    return (
      <div className={statusClassName}>
        {leagueStoreData.hasError && <div>{leagueStoreData.errorMessage}</div>}
        {leagueStoreData.successMessage && (
          <div>{leagueStoreData.successMessage}</div>
        )}
      </div>
    );
  }

  return (
    <div>
      League Summary
      {renderSuccessErrorDetails()}
      {renderTabContainerForLeague()}
    </div>
  );
};

export {League};
