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
import {Button, Row, Col, Badge, Navbar, Nav, Form} from 'react-bootstrap';
import {GetLoginStoreData, checkUserAccess} from '../../Authentication/redux';
import LoadingOverlay from 'react-loading-overlay';
import {useParams} from 'react-router-dom';
import {isListEmpty} from 'common/util';
import PlayerTypeCountSummary from '../UserTeam/component/common/PlayerTypeCountSummary';
import {fetchPlayerStatsListAction, getStatsProps} from '../stats/redux';

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
  const statsProps = getStatsProps();
  const fetchPlayerHistory = fetchPlayerStatsListAction();

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

  function fetchPlayerHistoryList(playerId: any) {
    fetchPlayerHistory(playerId);
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
        <Row className="nameColumn">
          <Col>
            <PlayerTypeCountSummary playerList={currentUserTeamPlayers} />
          </Col>
        </Row>
      </div>
    );
  }

  function removeRowAction(row: any) {
    updateCurrentUserTeam(row, 'REMOVE');
  }

  function renderAutoPickTeam() {
    const teamCreateMsg = 'Create team Or Auto Pick if you are short of time.';
    return (
      <Fragment>
        <Row>
          <Col>
            <StatusMessage
              text={teamCreateMsg}
              type="info"
              key={teamCreateMsg}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="outline-success"
              className="mr-2"
              onClick={() => autoPickUserTeam()}>
              Auto Pick Team
            </Button>
          </Col>
        </Row>
      </Fragment>
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
              variant={!teamValid ? 'outline-secondary' : 'outline-primary'}
              className="mr-2"
              onClick={() => saveTeam()}
              disabled={!teamValid}>
              Save Team
            </Button>
            <Button
              variant="outline-primary"
              className="mr-2"
              onClick={() => resetUserTeam()}>
              Reset
            </Button>
            {!isListEmpty(userteamDataProps.userTeamPlayers) && (
              <Button
                variant="outline-primary"
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
        <Row className="iplPlayerListTitle">
          <Col>IPL player list</Col>
        </Row>
        <TournamentPlayerList
          data={userteamDataProps.playerList}
          onRowSelected={onPlayerSelectedFromPlayerList}
          currentUserTeamPlayers={userteamDataProps.currentUserTeamPlayers}
          playerStats={statsProps.playerStats}
          fetchPlayerHistory={fetchPlayerHistoryList}
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
                    variant="outline-primary"
                    className="mr-4"
                    onClick={() => setTabName('transfer')}>
                    Make Transfer
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
        {checkUserAccess()}
        {tabName == 'teamDetails' && renderTeamDetails()}
        {tabName == 'transfer' && renderManageTransfer()}
      </LoadingOverlay>
    </div>
  );
};

export default UserTeam;
