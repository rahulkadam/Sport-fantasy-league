import React, {useMemo, Fragment} from 'react';
import DataTable from 'react-data-table-component';
import {Form, Dropdown, Row, Col} from 'react-bootstrap';
import {customStyles} from 'common/components/DataTable';
import {returnMapFromList} from 'common/util';
import {ExpandPlayerRow} from './ExpandPlayerRow';

const TournamentPlayerList = ({
  data,
  title,
  onRowSelected,
  currentUserTeamPlayers,
}: UserTeamPlayerDetails) => {
  const [filterText, setFilterText] = React.useState('');
  const currentUserPlayerMap = returnMapFromList(currentUserTeamPlayers);

  function customName(row: any) {
    return (
      <div>
        {row.name} ({row.id})
      </div>
    );
  }

  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      cell: customName,
    },
    {
      name: 'Type',
      selector: 'type',
      sortable: true,
    },
    {
      name: 'Value',
      selector: 'value',
      sortable: true,
    },
    {
      name: 'Team',
      selector: 'teamsNameList',
      sortable: true,
      right: true,
    },
    {
      name: 'Country',
      selector: 'country',
      sortable: true,
      right: true,
    },
  ];

  function onRowSelectedAction(state: any) {
    console.log('Selected Rows: ', state.selectedRows);
    if (onRowSelected) {
      onRowSelected(state.selectedRows);
    }
  }

  function onRowClickedAction(row: any, e: any) {
    console.log(row.name);
  }

  const renderCustomSearch = useMemo(() => {
    return (
      <div>
        <Form.Control
          type="text"
          placeholder="Player Name"
          onChange={(e: any) => setFilterText(e.target.value)}
          value={filterText}
        />
      </div>
    );
  }, [filterText]);

  const filteredRows =
    data &&
    data.filter(
      (item: any) =>
        item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
    );

  function checkDisabledPlayer(row: any) {
    return currentUserPlayerMap.size == 11 || currentUserPlayerMap.get(row.id);
  }

  return (
    <div>
      {data && data.length == 0 && <div>LIst is empty, please fetch again</div>}
      {data && data.length > 0 && (
        <DataTable
          title={title}
          columns={columns}
          customStyles={customStyles}
          data={filteredRows}
          selectableRows
          onRowClicked={onRowClickedAction}
          onSelectedRowsChange={onRowSelectedAction}
          pagination
          paginationPerPage={50}
          paginationResetDefaultPage
          subHeader
          subHeaderComponent={renderCustomSearch}
          subHeaderAlign="left"
          striped
          selectableRowDisabled={checkDisabledPlayer}
          expandableRows
          expandableRowsComponent={<ExpandPlayerRow />}
        />
      )}
    </div>
  );
};

export {TournamentPlayerList};
