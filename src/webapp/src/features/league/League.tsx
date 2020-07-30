import React, {useEffect, Fragment} from 'react';
import {getLeagueData, fetchUserLeagueListAction} from './redux';
import {LeagueList} from './component/LeagueList';
import {JoinLeague} from './component/JoinLeague';
import {Col, Nav, Row, Tab} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';

const League = () => {
  const leagueStoreData = getLeagueData();
  const leagueObjdata = leagueStoreData.data || {};
  const userleagueList = leagueObjdata.userleagueList || [];
  const fetchUserLeagueList = fetchUserLeagueListAction();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const tabName = query.get('tab') || 'overview';

  useEffect(() => {
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
        {userleagueList.length == 0 && <JoinLeague />}
      </Fragment>
    );
  }

  function renderJoinLeague() {
    return <JoinLeague />;
  }

  function renderTabContainerForLeague() {
    return (
      <div>
        <Tab.Container id="left-tabs-example" defaultActiveKey={tabName}>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="overview">League Overview</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="register">Join League</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="overview">
                  {renderLeagueOverview()}
                </Tab.Pane>
                <Tab.Pane eventKey="register">{renderJoinLeague()}</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }

  return (
    <div>
      IPL League Details
      {renderTabContainerForLeague()}
    </div>
  );
};

export {League};
