import React from 'react';
import DataTable from 'react-data-table-component';
import {customStyles} from 'common/components/DataTable';
import {getTime} from 'common/util';

const FantasyErrorList = ({errorList}: ErrorListProps) => {
  function convertDateTime(row: any) {
    return <div className="nameColumn">{getTime(row.updated_at)}</div>;
  }

  const columns = [
    {
      name: 'Time',
      selector: 'updated_at',
      sortable: true,
      cell: convertDateTime,
    },
    {
      name: 'Name',
      selector: 'message',
      sortable: true,
    },
    {
      name: 'Sport',
      selector: 'description',
      sortable: true,
    },
  ];

  return (
    <div>
      {errorList && errorList.length == 0 && (
        <div>LIst is empty, please fetch again</div>
      )}
      {errorList && errorList.length > 0 && (
        <DataTable
          title="Error List"
          columns={columns}
          customStyles={customStyles}
          data={errorList}
          selectableRows
          subHeader
          subHeaderAlign="left"
          striped
        />
      )}
    </div>
  );
};

export {FantasyErrorList};
