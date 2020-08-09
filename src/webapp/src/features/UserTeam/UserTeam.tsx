import React, {Fragment, useEffect, useState} from 'react';
import {StatusMessage, TabContainer} from 'common/components';
import {
  UserTeamPlayerDetails,
  TeamDetails,
  CreateTeam,
  TournamentPlayerList,
} from './component';
import {
  fetchAllPlayerListAction,
  getUserTeamData,
  fetchPlayerListByUserAction,
  addRemovePlayerToInternalUserTeamAction,
  saveUserTeamAction,
  createUserTeamAction,
  fetchGameCriteriaByNameAction,
  validateTeam,
} from './redux';
import {Button, Row, Col, Badge} from 'react-bootstrap';
import {DefaultUserId, DefaultUserTeamId} from 'common/util';

const UserTeam = () => {
  const userteamDataProps = getUserTeamData();
  const fetchPlayerList = fetchAllPlayerListAction();
  const fetchPlayerListByUser = fetchPlayerListByUserAction();
  const updateCurrentUserTeam = addRemovePlayerToInternalUserTeamAction();
  const fetchGameCriteriaByName = fetchGameCriteriaByNameAction();
  const saveUserTeam = saveUserTeamAction();
  const createUserTeam = createUserTeamAction();
  const isUserTeamAvailable =
    userteamDataProps.userteam && userteamDataProps.userteam.id;
  const currentUserTeamPlayers = userteamDataProps.currentUserTeamPlayers;
  const defaultTabKey = 'teamDetails';
  const [tabName, setTabName] = useState(defaultTabKey);

  if (userteamDataProps.shouldRefresh && tabName != defaultTabKey) {
    setTabName(defaultTabKey);
  }

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchPlayerList();
    fetchPlayerListByUser(DefaultUserId);
    fetchGameCriteriaByName('CRICKET');
  }, []);

  function onPlayerSelectedFromPlayerList(selectedRows: any) {
    console.log('from parent control', selectedRows);
    updateCurrentUserTeam(selectedRows);
  }

  function renderTeamDetails() {
    if (isUserTeamAvailable) {
      return <TeamDetails data={userteamDataProps} />;
    } else {
      return <CreateTeam createTeamAction={createUserTeam} />;
    }
  }

  function saveTeam() {
    console.log(
      'saving team with team player',
      userteamDataProps.currentUserTeamPlayers.length
    );
    const userteamId = DefaultUserTeamId;
    saveUserTeam(userteamId, currentUserTeamPlayers);
  }

  const validateTeamTransfer: string[] = validateTeam(userteamDataProps);
  const teamValid = validateTeamTransfer.length == 0;

  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = isError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }

  function renderShowTransferOverview() {
    const availableBalance = userteamDataProps.currentUserTeamValue;
    const statusValue = teamValid
      ? {message: 'COMPLETE', type: 'success'}
      : {message: 'INCOMPLETE', type: 'danger'};
    return (
      <Fragment>
        <Row>
          <Col>Available Transfer</Col>
          <Col>Available Credit</Col>
          <Col>Status</Col>
          <Col>Transfer Used Now</Col>
        </Row>
        <Row>
          <Col>{userteamDataProps.userteam.remained_Transfer}</Col>
          <Col>{availableBalance}</Col>
          <Col>
            <Badge pill variant={statusValue.type}>
              {statusValue.message}
            </Badge>
          </Col>
          <Col>{userteamDataProps.currentTransferChanges}</Col>
        </Row>
      </Fragment>
    );
  }

  function removeRowAction(row: any) {
    updateCurrentUserTeam(row, 'REMOVE');
  }

  function renderError() {
    const errorStatusMessage: any = [];
    validateTeamTransfer.forEach((message: string) =>
      errorStatusMessage.push(renderStatusMessage(true, message))
    );
    return errorStatusMessage;
  }

  function renderManageTransfer() {
    return (
      <div>
        {renderShowTransferOverview()}
        <UserTeamPlayerDetails
          title="Your Selected Fantasy Team"
          data={userteamDataProps.currentUserTeamPlayers}
          onRemoveRowAction={removeRowAction}
        />
        {renderError()}
        <Button
          variant="primary"
          onClick={() => saveTeam()}
          disabled={!teamValid}>
          Save Team
        </Button>
        <TournamentPlayerList
          title="Tournament Player List"
          data={userteamDataProps.playerList}
          onRowSelected={onPlayerSelectedFromPlayerList}
          currentUserTeamPlayers={userteamDataProps.currentUserTeamPlayers}
        />
      </div>
    );
  }

  const tabConfig: TabConfig[] = [
    {
      key: 'teamDetails',
      title: 'Team Details',
      renderfunction: renderTeamDetails(),
    },
    {
      key: 'transfer',
      title: 'Manage Transfer',
      renderfunction: renderManageTransfer(),
    },
  ];

  return (
    <div>
      {renderStatusMessage(
        userteamDataProps.hasError,
        userteamDataProps.statusMessage
      )}
      <TabContainer
        defaultKey={tabName}
        tabConfig={tabConfig}
        activeKey={tabName}
        onSelect={(key: string) => setTabName(key)}
      />
    </div>
  );
};

export {UserTeam};
