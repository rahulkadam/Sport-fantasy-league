import React, {Fragment} from 'react';
import {Row, Col} from 'react-bootstrap';

const LeagueList = (props: LeagueUserListProps) => {
  const userLeagueList: any = props.userleagueList || [];
  function renderLeague(userleagueList: any) {
    return (
      <Row>
        <Col>{userleagueList.name}</Col>
        <Col>{userleagueList.status}</Col>
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
        <Col>Points</Col>
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
