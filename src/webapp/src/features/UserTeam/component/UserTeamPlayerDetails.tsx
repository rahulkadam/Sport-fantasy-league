import React, {useMemo} from 'react';
import DataTable from 'react-data-table-component';
import {Form} from 'react-bootstrap';
import {customStyles} from 'common/components/DataTable';

const UserTeamPlayerDetails = ({data}: UserTeamPlayerDetails) => {
  const [filterText, setFilterText] = React.useState('');

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

  const filteredRows =
    data &&
    data.filter(
      (item: any) =>
        item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
    );

  return (
    <div>
      {data && data.length == 0 && <div>LIst is empty, please fetch again</div>}
      {data && data.length > 0 && (
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
      )}
    </div>
  );
};

export {UserTeamPlayerDetails};
