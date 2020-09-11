import React from 'react';
import DataTable from 'react-data-table-component';
import {customStyles} from 'common/components/DataTable';
import {getTime} from 'common/util';

const FantasyConfigList = ({list}: ConfigListProps) => {
  function convertDateTime(row: any) {
    return <div className="nameColumn">{getTime(row.updated_at)}</div>;
  }

  const columns = [
    {
      name: 'Key',
      selector: 'configkey',
      sortable: true,
      grow: 2,
    },
    {
      name: 'Value',
      selector: 'configvalue',
      sortable: true,
      grow: 2,
    },
    {
      name: 'Time',
      selector: 'updated_at',
      sortable: true,
      cell: convertDateTime,
    },
  ];

  return (
    <div>
      {list && list.length == 0 && <div>LIst is empty, please fetch again</div>}
      {list && list.length > 0 && (
        <DataTable
          title="Config List"
          columns={columns}
          customStyles={customStyles}
          data={list}
          selectableRows
          subHeader
          subHeaderAlign="left"
          striped
        />
      )}
    </div>
  );
};

export {FantasyConfigList};
