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
  resetUserTeamAction,
} from './redux';
import {Button, Row, Col, Badge, ProgressBar} from 'react-bootstrap';
import {GetLoginStoreData, checkUserAccess} from '../../Authentication/redux';
import LoadingOverlay from 'react-loading-overlay';
import {useParams} from 'react-router-dom';
import {isListEmpty} from '../../../common/util';

const UserTeam = () => {
  const userteamDataProps = getUserTeamData();
  const userProps = GetLoginStoreData();
  const fetchPlayerList = fetchAllPlayerListAction();
  const fetchPlayerListByUser = fetchPlayerListByUserAction();
  const updateCurrentUserTeam = addRemovePlayerToInternalUserTeamAction();
  const resetUserTeam = resetUserTeamAction();
  const fetchGameCriteriaByName = fetchGameCriteriaByNameAction();
  const saveUserTeam = saveUserTeamAction();
  const createUserTeam = createUserTeamAction();
  const isUserTeamAvailable =
    userteamDataProps.userteam && userteamDataProps.userteam.id;
  const userTeamId =
    userteamDataProps.userteam && userteamDataProps.userteam.id;
  const currentUserTeamPlayers = userteamDataProps.currentUserTeamPlayers;
  const {tab} = useParams();
  const defaultTabKey = tab || 'teamDetails';
  const [tabName, setTabName] = useState(defaultTabKey);

  if (userteamDataProps.shouldRefresh && tabName != defaultTabKey) {
    setTabName(defaultTabKey);
  }

  useEffect(() => {
    if (isListEmpty(userteamDataProps.playerList)) {
      fetchPlayerList();
    }
    if (!isUserTeamAvailable) {
      fetchPlayerListByUser(userProps.id);
      fetchGameCriteriaByName('CRICKET');
    }
  }, []);

  useEffect(() => {
    if (userteamDataProps.shouldRefresh) {
      fetchPlayerListByUser(userProps.id);
    }
  });
  function onPlayerSelectedFromPlayerList(selectedRows: any) {
    updateCurrentUserTeam(selectedRows);
  }

  function renderTeamDetails() {
    if (isUserTeamAvailable) {
      return <TeamDetails data={userteamDataProps} />;
    } else {
      return (
        <CreateTeam createTeamAction={createUserTeam} userProps={userProps} />
      );
    }
  }

  function saveTeam() {
    const userteamId = userTeamId;
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
      <div className="transferOverview">
        <Row className="nameColumn">
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
      </div>
    );
  }

  function removeRowAction(row: any) {
    updateCurrentUserTeam(row, 'REMOVE');
  }

  function renderTeamCompletionProgressBar(progress: number) {
    return (
      <Row className="errorRow">
        <Col sm={6} md={6}>
          <ProgressBar>
            <ProgressBar variant="success" now={progress} label={'Complete'} />
            <ProgressBar
              variant="danger"
              now={100 - progress}
              label={'InComplete'}
            />
          </ProgressBar>
        </Col>
      </Row>
    );
  }

  function renderError() {
    const errorStatusMessage: any = [];
    if (currentUserTeamPlayers && currentUserTeamPlayers.length > 0) {
      const teamCompletionProgess = (currentUserTeamPlayers.length / 11) * 100;
      if (teamCompletionProgess < 100) {
        errorStatusMessage.push(
          renderTeamCompletionProgressBar(teamCompletionProgess)
        );
      }
      validateTeamTransfer.forEach((message: string) =>
        errorStatusMessage.push(
          <Row>
            <Col>
              <Badge variant="danger">{message} </Badge>
            </Col>
          </Row>
        )
      );
    } else {
      const teamCreateMsg =
        'Please select player from below list and save Team';
      errorStatusMessage.push(renderStatusMessage(true, teamCreateMsg));
    }
    return <div>{errorStatusMessage}</div>;
  }

  function renderUserTeamTransferTabDetails() {
    return (
      <Fragment>
        {renderShowTransferOverview()}
        <UserTeamPlayerDetails
          title="Your Selected Fantasy Team"
          data={userteamDataProps.currentUserTeamPlayers}
          onRemoveRowAction={removeRowAction}
        />
        {renderError()}
        <Row className="saveTeamBtn">
          <Col md={2} xs={4}>
            <Button
              variant="primary"
              onClick={() => saveTeam()}
              disabled={!teamValid}>
              Proceed
            </Button>
          </Col>
          <Col md={2} xs={6}>
            <Button variant="primary" onClick={() => resetUserTeam()}>
              Reset
            </Button>
          </Col>
        </Row>
        <TournamentPlayerList
          title="Tournament Player List"
          data={userteamDataProps.playerList}
          onRowSelected={onPlayerSelectedFromPlayerList}
          currentUserTeamPlayers={userteamDataProps.currentUserTeamPlayers}
        />
      </Fragment>
    );
  }

  function renderManageTransfer() {
    return (
      <div>
        {isUserTeamAvailable && renderUserTeamTransferTabDetails()}
        {!isUserTeamAvailable && (
          <CreateTeam createTeamAction={createUserTeam} userProps={userProps} />
        )}
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
    <div className="userTeamContainer">
      <LoadingOverlay
        active={userteamDataProps.isLoading}
        spinner
        text="Loading User Team Details ...">
        {renderStatusMessage(
          userteamDataProps.hasError,
          userteamDataProps.statusMessage
        )}
        {checkUserAccess(userteamDataProps.statusMessage)}
        <TabContainer
          defaultKey={tabName}
          tabConfig={tabConfig}
          activeKey={tabName}
          onSelect={(key: string) => setTabName(key)}
        />
      </LoadingOverlay>
    </div>
  );
};

export default UserTeam;
