import React, {Fragment, useState} from 'react';
import DataTable from 'react-data-table-component';
import {customStyles} from 'common/components/DataTable';
import './LeagueComponent.styles.scss';
import {Nav} from 'react-bootstrap';
import LeagueMemberTeamDetails from './LeagueMemberTeamDetails';

const ExpandLeagueRow = ({data, fetchTeamByUser, playerList}: any) => {
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
      />
    );
  }

  function customName(row: any) {
    return (
      <div onClick={() => fetchUserLeagueList(row.user_team_id)}>
        <Nav.Link>{row.userName} </Nav.Link>
      </div>
    );
  }

  const columns = [
    {
      name: 'Rank',
      selector: 'userrank',
      sortable: true,
    },
    {
      name: 'Name',
      selector: 'userName',
      sortable: true,
      cell: customName,
    },
    {
      name: 'Score',
      selector: 'score',
      sortable: true,
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
            striped
            noHeader={true}
            defaultSortField="userrank"
            defaultSortAsc={true}
          />
        )}
      </div>
    );
  }

  return <div className="expandLeagueContainer">{renderUserList()}</div>;
};

export {ExpandLeagueRow};
