import React, {Fragment} from 'react';
import {Row, Col} from 'react-bootstrap';

const LeagueList = (props: LeagueUserListProps) => {
  const userLeagueList: any = props.userleagueList || [];
  function renderLeague(userleagueList: any) {
    const leagueStatus = userleagueList.status ? 'Active' : 'InActive';
    return (
      <Row key={userleagueList.id}>
        <Col>
          {userleagueList.name} ({userleagueList.id})
        </Col>
        <Col>{userleagueList.leagueCode}</Col>
        <Col>{leagueStatus}</Col>
        <Col>{userleagueList.totalUserCount}</Col>
      </Row>
    );
  }
  function renderLeagueList() {
    const renderLeagueList: any = [];
    userLeagueList.forEach((league: any) =>
      renderLeagueList.push(renderLeague(league))
    );
    return renderLeagueList;
  }

  function renderHeader() {
    return (
      <Row>
        <Col>Name</Col>
        <Col>Code</Col>
        <Col>Ranking</Col>
        <Col>Total Members</Col>
      </Row>
    );
  }

  return (
    <Fragment>
      {renderHeader()}
      {renderLeagueList()}
    </Fragment>
  );
};

export {LeagueList};
