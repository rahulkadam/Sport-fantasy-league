import React, {useState} from 'react';
import DataTable from 'react-data-table-component';
import {customStyles} from 'common/components/DataTable';
import {Row, Col, Badge} from 'react-bootstrap';
import './LeagueComponent.styles.scss';
import {Nav} from 'react-bootstrap';
import LeagueMemberTeamDetails from './LeagueMemberTeamDetails';
import {StatusMessage} from 'common/components';
import {GA_League_Event} from 'common/config';
import {isListEmpty} from '../../../../common/util';

const ExpandLeagueRow = ({
  data,
  fetchTeamByUser,
  playerList,
  captainId,
}: any) => {
  const userList = data.leagueUserTeamDTOS;
  const [showMemberTeam, setShowMemberTeam] = useState(false);
  const handleMemberTeamClose = () => setShowMemberTeam(false);
  const handleMemberTeamShow = () => setShowMemberTeam(true);

  function fetchUserLeagueList(userId: string) {
    fetchTeamByUser(userId);
    if (showMemberTeam) {
      handleMemberTeamClose();
    } else {
      handleMemberTeamShow();
    }
  }

  function renderLeagueMemberTeamDetails() {
    if (!showMemberTeam) return;
    return (
      <LeagueMemberTeamDetails
        handleClose={handleMemberTeamClose}
        show={showMemberTeam}
        playerList={playerList}
        captainId={captainId}
      />
    );
  }

  function customName(row: any) {
    return (
      <div
        onClick={() => {
          GA_League_Event('View Other member Team');
          fetchUserLeagueList(row.user_team_id);
        }}>
        <Nav.Link>{row.userName} </Nav.Link>
      </div>
    );
  }

  function customTeamName(row: any) {
    return (
      <div
        onClick={() => {
          GA_League_Event('View Other member Team');
          fetchUserLeagueList(row.user_team_id);
        }}>
        <Nav.Link>{row.teamName} </Nav.Link>
      </div>
    );
  }

  const columns = [
    {
      name: 'Rank',
      selector: 'userrank',
      sortable: true,
      width: '15%',
      center: true,
    },
    {
      name: 'Team',
      selector: 'teamName',
      sortable: true,
      width: '35%',
      left: true,
      cell: customTeamName,
    },
    {
      name: 'Score',
      selector: 'score',
      sortable: true,
      width: '15%',
      left: true,
    },
    {
      name: 'Transfer',
      selector: 'transferCount',
      sortable: true,
      width: '15%',
      left: true,
    },
  ];

  function renderUserList() {
    return (
      <div>
        {renderLeagueMemberTeamDetails()}
        {userList && userList.length > 0 && (
          <DataTable
            columns={columns}
            customStyles={customStyles}
            data={userList}
            highlightOnHover
            striped
            noHeader={true}
            defaultSortField="userrank"
            defaultSortAsc={true}
          />
        )}
      </div>
    );
  }

  function renderLeagueDetails() {
    return (
      <div>
        <Row>
          <Col>
            League Code : <Badge variant="success"> {data.leagueCode}</Badge>
          </Col>
        </Row>
        {isListEmpty(userList) && (
          <Row>
            <Col>
              <StatusMessage
                type="info"
                text="Public League Member details is not available"
              />
            </Col>
          </Row>
        )}
      </div>
    );
  }

  return (
    <div className="expandLeagueContainer">
      {renderLeagueDetails()}
      {renderUserList()}
    </div>
  );
};

export {ExpandLeagueRow};
