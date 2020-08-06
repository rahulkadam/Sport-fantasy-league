import React, {Fragment, useEffect} from 'react';
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
} from './redux';
import {Button, Row, Col, Badge} from 'react-bootstrap';
import {DefaultUserId, DefaultUserTeamId} from 'common/util';
import {bool} from 'prop-types';

const UserTeam = () => {
  const userteamDataProps = getUserTeamData();
  const fetchPlayerList = fetchAllPlayerListAction();
  const fetchPlayerListByUser = fetchPlayerListByUserAction();
  const updateCurrentUserTeam = addRemovePlayerToInternalUserTeamAction();
  const saveUserTeam = saveUserTeamAction();
  const createUserTeam = createUserTeamAction();
  const tabName = 'teamDetails';
  const isUserTeamAvailable =
    userteamDataProps.userteam && userteamDataProps.userteam.id;
  const currentUserTeamPlayers = userteamDataProps.currentUserTeamPlayers;

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchPlayerList();
    fetchPlayerListByUser(DefaultUserId);
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

  function validateSaveTeam() {
    const saveTeamDisable =
      currentUserTeamPlayers.length != 5 ||
      userteamDataProps.currentUserTeamValue > 100;
    return saveTeamDisable;
  }

  function renderShowTransferOverview() {
    const validateTeam = validateSaveTeam();
    const statusValue = !validateTeam
      ? {message: 'COMPLETE', type: 'success'}
      : {message: 'INCOMPLETE', type: 'danger'};
    return (
      <Fragment>
        <Row>
          <Col>Available Transfer</Col>
          <Col>Available Credit</Col>
          <Col>Status</Col>
        </Row>
        <Row>
          <Col>50</Col>
          <Col>{100 - userteamDataProps.currentUserTeamValue}</Col>
          <Col>
            <Badge pill variant={statusValue.type}>
              {statusValue.message}
            </Badge>
          </Col>
        </Row>
      </Fragment>
    );
  }

  function removeRowAction(row: any) {
    updateCurrentUserTeam(row, 'REMOVE');
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
        <Button
          variant="primary"
          onClick={() => saveTeam()}
          disabled={validateSaveTeam()}>
          Save Team
        </Button>
        <TournamentPlayerList
          title="Tournament Player List"
          data={userteamDataProps.playerList}
          onRowSelected={onPlayerSelectedFromPlayerList}
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
  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = userteamDataProps.hasError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }
  return (
    <div>
      {renderStatusMessage(
        userteamDataProps.hasError,
        userteamDataProps.statusMessage
      )}
      <TabContainer defaultKey={tabName} tabConfig={tabConfig} />
    </div>
  );
};

export {UserTeam};
