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
import {
  Button,
  Row,
  Col,
  Badge,
  ProgressBar,
  Navbar,
  Nav,
  Form,
} from 'react-bootstrap';
import {GetLoginStoreData, checkUserAccess} from '../../Authentication/redux';
import LoadingOverlay from 'react-loading-overlay';
import {useParams} from 'react-router-dom';
import {isListEmpty} from 'common/util';

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
  const defaultTabKey = tab || 'transfer';
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
        <CreateTeam
          createTeamAction={createUserTeam}
          userProps={userProps}
          key="createteam1"
        />
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
    return (
      <StatusMessage
        text={statusMessage}
        type={statusClassName}
        key={statusMessage}
      />
    );
  }

  function renderShowTransferOverview() {
    const availableBalance = userteamDataProps.currentUserTeamValue;
    const statusValue = teamValid
      ? {message: 'COMPLETE', type: 'success'}
      : {message: 'INCOMPLETE', type: 'danger'};
    return (
      <div className="transferOverview">
        <Row className="nameColumn">
          <Col>Transfer</Col>
          <Col>Credit</Col>
          <Col>Status</Col>
          <Col>Changes</Col>
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
      /**
      const teamCompletionProgess = (currentUserTeamPlayers.length / 11) * 100;
      if (teamCompletionProgess < 100) {
        errorStatusMessage.push(
          renderTeamCompletionProgressBar(teamCompletionProgess)
        );
      } **/
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

  function renderSaveButton() {
    return (
      <Navbar
        fixed="bottom"
        bg="dark"
        variant="dark"
        className="justify-content-center">
        <Nav>
          <Form inline>
            <Button
              variant="primary"
              className="mr-4"
              onClick={() => saveTeam()}
              disabled={!teamValid}>
              Save Team
            </Button>
            <Button
              variant="primary"
              className="mr-2"
              onClick={() => resetUserTeam()}>
              Reset
            </Button>
          </Form>
        </Nav>
      </Navbar>
    );
  }

  function renderUserTeamTransferTabDetails() {
    return (
      <Fragment>
        {renderShowTransferOverview()}
        {renderError()}
        <UserTeamPlayerDetails
          title="Your Team"
          data={userteamDataProps.currentUserTeamPlayers}
          onRemoveRowAction={removeRowAction}
        />
        {renderSaveButton()}
        <h4>
          <Badge variant="light">Add player from below list</Badge>
        </h4>
        <TournamentPlayerList
          data={userteamDataProps.playerList}
          onRowSelected={onPlayerSelectedFromPlayerList}
          currentUserTeamPlayers={userteamDataProps.currentUserTeamPlayers}
        />
      </Fragment>
    );
  }

  function renderManageTransfer() {
    return (
      <div key="renderms">
        {isUserTeamAvailable && renderUserTeamTransferTabDetails()}
        {!isUserTeamAvailable && (
          <CreateTeam
            createTeamAction={createUserTeam}
            userProps={userProps}
            key="createteam2"
          />
        )}
      </div>
    );
  }

  const tabConfig: TabConfig[] = [
    {
      key: 'teamDetails',
      title: 'View Team',
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
