import React, {Fragment} from 'react';
import './UserTeamView.styles.scss';
import {Row, Col} from 'react-bootstrap';
import {Logo} from 'common/components';
import {getLogoNameByTeam} from 'common/components/FantasyDropDown';
import {getPlayerListByType} from '../../../redux';
import {isListEmpty} from 'common/util';

const UserTeamView = (props: UserTeamViewProps) => {
  const userTeam = props.userTeam;
  const playerList = userTeam.currentUserTeamPlayers;
  const playerCount = playerList.length;
  const availableBalance = userTeam.currentUserTeamValue;
  const currentTransferChanges = userTeam.currentTransferChanges;

  function getTeamName(player: any) {
    return !isListEmpty(player.teamsNameList) ? player.teamsNameList[0] : '';
  }

  function renderPlayer(teamName: string, playerName: string) {
    return (
      <Fragment>
        <Logo logoSource={getLogoNameByTeam(teamName)} width="20" />
        {playerName}
      </Fragment>
    );
  }

  function renderPlayerColumn(player: any) {
    return (
      <Col xs={6} md={4} className="playerCol">
        {renderPlayer(getTeamName(player), player.name)}
      </Col>
    );
  }

  function renderPlayerByTypeList(type: string) {
    const wkList = getPlayerListByType(playerList, type);
    const list: any[] = [];
    wkList.forEach(player => {
      list.push(renderPlayerColumn(player));
    });
    return (
      <Fragment>
        <Row className="justify-content-center teamRowTitle">
          <Col xs={6} md={4} className="teamColTitle">
            <span className="titlebkcolor">{type} </span>
          </Col>
        </Row>
        <Row className="justify-content-center">{list}</Row>
      </Fragment>
    );
  }

  function renderHeader() {
    return (
      <Row>
        <Col xs={6} md={4} className="playerCol">
          <span className="titlebkcolor">Players :</span> {playerCount}
        </Col>
        <Col xs={6} md={4} className="playerCol">
          <span className="titlebkcolor">Credit :</span> {availableBalance}
        </Col>
        <Col xs={6} md={4} className="playerCol">
          <span className="titlebkcolor">Changes :</span>{' '}
          {currentTransferChanges}
        </Col>
      </Row>
    );
  }

  function renderPlayerList() {
    return (
      <div>
        {renderHeader()}
        {renderPlayerByTypeList('WICKETKEEPER')}
        {renderPlayerByTypeList('BATSMAN')}
        {renderPlayerByTypeList('ALLROUNDER')}
        {renderPlayerByTypeList('BOWLER')}
      </div>
    );
  }
  return <div className="userTeamViewContainer">{renderPlayerList()}</div>;
};

export default UserTeamView;
