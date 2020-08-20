import React, {Fragment, useEffect, useState} from 'react';
import {StatusMessage} from 'common/components';
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
  updateTeamCaptionAction,
  autoPickUserTeamAction,
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
  const autoPickUserTeam = autoPickUserTeamAction();
  const createUserTeam = createUserTeamAction();
  const isUserTeamAvailable =
    userteamDataProps.userteam && userteamDataProps.userteam.id;
  const userTeamId =
    userteamDataProps.userteam && userteamDataProps.userteam.id;
  const currentUserTeamPlayers = userteamDataProps.currentUserTeamPlayers;
  const {tab} = useParams();
  const defaultTabKey = tab || 'teamDetails';
  const [tabName, setTabName] = useState(defaultTabKey);
  const captainPlayerId = userteamDataProps.captionPlayerId;
  const updateTeamCaption = updateTeamCaptionAction();

  if (userteamDataProps.shouldRefresh && tabName != defaultTabKey) {
    setTabName('teamDetails');
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

  function saveTeam() {
    const userteamId = userTeamId;
    saveUserTeam(userteamId, currentUserTeamPlayers, captainPlayerId);
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
          <Col>TRANSFER</Col>
          <Col>CREDITS</Col>
          <Col>CHANGES</Col>
        </Row>
        <Row>
          <Col>{userteamDataProps.userteam.remained_Transfer}</Col>
          <Col>{availableBalance}</Col>
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

  function renderAutoPickTeam() {
    return (
      <Row>
        <Col>
          <Button
            variant="info"
            className="mr-2"
            onClick={() => autoPickUserTeam()}>
            Auto Pick Team
          </Button>
        </Col>
      </Row>
    );
  }

  function renderError() {
    const errorStatusMessage: any = [];
    if (currentUserTeamPlayers && currentUserTeamPlayers.length > 0) {
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
      const teamCreateMsg = 'Create team by using below player list.';
      errorStatusMessage.push(renderStatusMessage(true, teamCreateMsg));
      errorStatusMessage.push(renderAutoPickTeam());
    }
    return <div className="errorPanel">{errorStatusMessage}</div>;
  }

  function renderSaveButton() {
    return (
      <Navbar
        fixed="bottom"
        bg="light"
        variant="light"
        className="justify-content-center saveTeamBtn">
        <Nav>
          <Form inline>
            <Button
              variant="primary"
              className="mr-2"
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
            {!isListEmpty(userteamDataProps.userTeamPlayers) && (
              <Button
                variant="primary"
                className="mr-2"
                onClick={() => setTabName('teamDetails')}>
                Current Team
              </Button>
            )}
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
          captionId={captainPlayerId}
          data={userteamDataProps.currentUserTeamPlayers}
          onRemoveRowAction={removeRowAction}
          updateCaptionAction={updateTeamCaption}
          editable={true}
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

  function renderTeamDetails() {
    if (isUserTeamAvailable) {
      if (isListEmpty(userteamDataProps.userTeamPlayers)) {
        return <Fragment>{renderManageTransfer()}</Fragment>;
      } else {
        return (
          <Fragment>
            <TeamDetails data={userteamDataProps} />
            <Navbar
              fixed="bottom"
              bg="light"
              variant="light"
              className="justify-content-center saveTeamBtn">
              <Nav>
                <Form inline>
                  <Button
                    variant="primary"
                    className="mr-4"
                    onClick={() => setTabName('transfer')}>
                    Change Team
                  </Button>
                </Form>
              </Nav>
            </Navbar>
          </Fragment>
        );
      }
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
        {tabName == 'teamDetails' && renderTeamDetails()}
        {tabName == 'transfer' && renderManageTransfer()}
      </LoadingOverlay>
    </div>
  );
};

export default UserTeam;
