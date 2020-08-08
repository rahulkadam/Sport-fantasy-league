import React, {Fragment} from 'react';
import DataTable from 'react-data-table-component';
import {customStyles} from 'common/components/DataTable';
import './LeagueComponent.styles.scss';

const ExpandLeagueRow = ({data}: any) => {
  const userList = data.leagueUserTeamDTOS;
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
