import React, {useMemo} from 'react';
import DataTable from 'react-data-table-component';
import {Form} from 'react-bootstrap';
import {customStyles} from 'common/components/DataTable';

const VenueDetails = ({data, title}: VenueDetailsProps) => {
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
      name: 'City',
      selector: 'city',
      sortable: true,
    },
    {
      name: 'Country',
      selector: 'country',
      sortable: true,
      right: true,
    },
  ];

  function onRowSelectedAction(state: any) {
    console.log('Selected Rows: ');
  }

  function onRowClickedAction(row: any, e: any) {
    console.log(row.name);
  }

  const renderCustomSearch = useMemo(() => {
    return (
      <div>
        <Form.Control
          type="text"
          placeholder="Venue Name"
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
          title={title}
          columns={columns}
          customStyles={customStyles}
          data={filteredRows}
          selectableRows
          onRowClicked={onRowClickedAction}
          onSelectedRowsChange={onRowSelectedAction}
          pagination
          paginationPerPage={10}
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

export {VenueDetails};
