import React, {useMemo} from 'react';
import DataTable from 'react-data-table-component';
import {Form} from 'react-bootstrap';

const UserTeamPlayerDetails = (props: UserTeamListProps) => {
  const [filterText, setFilterText] = React.useState('');
  const UserteamData = props;
  const customStyles = {
    rows: {
      style: {
        minHeight: '32px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '4px', // override the cell padding for head cells
        paddingRight: '4px',
      },
    },
    cells: {
      style: {
        paddingLeft: '4px', // override the cell padding for data cells
        paddingRight: '4px',
      },
    },
  };

  const data = [
    {id: 1, name: 'Sachin', type: 'Batsman', value: '5.6', country: 'India'},
    {id: 2, name: 'Saurav', type: 'Bowler', value: '9.8', team: 'Kolkata'},
    {id: 13, name: 'Dravid', type: 'All Rounder', value: '10', team: 'Mumbai'},
    {id: 23, name: 'Dravid', type: 'All Rounder', value: '10', team: 'Mumbai'},
    {id: 33, name: 'Dravid', type: 'All Rounder', value: '10', team: 'Mumbai'},
    {id: 43, name: 'Dravid', type: 'All Rounder', value: '10', team: 'Mumbai'},
    {id: 53, name: 'Dravid', type: 'All Rounder', value: '10', team: 'Mumbai'},
    {id: 63, name: 'Dravid', type: 'All Rounder', value: '10', team: 'Mumbai'},
    {id: 73, name: 'Dravid', type: 'All Rounder', value: '10', team: 'Mumbai'},
    {id: 83, name: 'Dravid', type: 'All Rounder', value: '10', team: 'Mumbai'},
    {id: 93, name: 'Dravid', type: 'All Rounder', value: '10', team: 'Mumbai'},
    {id: 983, name: 'Dravid', type: 'All Rounder', value: '10', team: 'Mumbai'},
    {
      id: 831,
      name: 'Dravid',
      type: 'All Rounder',
      value: '10',
      team: 'Mumbai',
    },
  ];
  function find(row: any) {
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
      cell: find,
    },
    {
      name: 'T',
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
      selector: 'team',
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

  function onRowSelected(state: any) {
    console.log(state.name);
    console.log('Selected Rows: ', state.selectedRows);
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

  const filteredRows = data.filter(
    (item: any) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <DataTable
        title="Your Fantasy Team"
        columns={columns}
        customStyles={customStyles}
        data={filteredRows}
        selectableRows
        onRowClicked={onRowSelected}
        onSelectedRowsChange={onRowSelected}
        pagination
        paginationPerPage={50}
        paginationResetDefaultPage
        subHeader
        subHeaderComponent={renderCustomSearch}
        subHeaderAlign="left"
        striped
      />
    </div>
  );
};

export {UserTeamPlayerDetails};
