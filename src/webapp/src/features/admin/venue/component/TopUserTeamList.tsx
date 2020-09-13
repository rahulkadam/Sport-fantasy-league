import React from 'react';
import DataTable from 'react-data-table-component';
import {customStyles} from 'common/components/DataTable';
import {getTime} from 'common/util';

const TopUserTeamList = ({userList}: TopUserTeamListProps) => {
  function convertDateTime(row: any) {
    return <div className="nameColumn">{getTime(row.updated_at)}</div>;
  }

  const columns = [
    {
      name: 'Name',
      selector: 'userName',
      sortable: true,
    },
    {
      name: 'Score',
      selector: 'total_score',
      sortable: true,
    },
    {
      name: 'Last Match',
      selector: 'last_score',
      sortable: true,
    },
    {
      name: 'Transfer',
      selector: 'remained_Transfer',
      sortable: true,
    },
    {
      name: 'email',
      selector: 'emailId',
      sortable: true,
      grow: 3,
    },
  ];

  return (
    <div>
      {userList && userList.length == 0 && (
        <div>LIst is empty, please fetch again</div>
      )}
      {userList && userList.length > 0 && (
        <DataTable
          title="Top 30 User List"
          columns={columns}
          customStyles={customStyles}
          data={userList}
          subHeader
          subHeaderAlign="left"
          striped
          defaultSortField="total_score"
          defaultSortAsc={false}
        />
      )}
    </div>
  );
};

export {TopUserTeamList};
