import React, {useMemo} from 'react';
import DataTable from 'react-data-table-component';
import {Form} from 'react-bootstrap';
import {customStyles} from 'common/components/DataTable';

const MatchDetails = ({data, title}: MatchDetailsProps) => {
  const [filterText, setFilterText] = React.useState('');

  function customName(row: any) {
    return (
      <div>
        {row.description} ({row.id})
      </div>
    );
  }

  function convertDateTime(row: any) {
    const dateTime = new Date(row.matchTime);
    return <div>{dateTime.toString()}</div>;
  }

  const columns = [
    {
      name: 'Name',
      selector: 'description',
      sortable: true,
      cell: customName,
    },
    {
      name: 'Time',
      selector: 'matchTime',
      sortable: true,
      cell: convertDateTime,
    },
    {
      name: 'Home Team',
      selector: 'team_host_name',
      sortable: true,
      right: true,
    },
    {
      name: 'Away Team',
      selector: 'team_away_name',
      sortable: true,
      right: true,
    },
    {
      name: 'Tournament',
      selector: 'tournament_name',
      sortable: true,
      right: true,
    },
    {
      name: 'Venue',
      selector: 'venue_name',
      sortable: true,
      right: true,
    },
  ];

  function onRowSelectedAction(state: any) {
    console.log('Selected Rows: ', state.selectedRows);
  }

  function onRowClickedAction(row: any, e: any) {
    console.log(row.name);
  }

  const renderCustomSearch = useMemo(() => {
    return (
      <div>
        <Form.Control
          type="text"
          placeholder="Match Name"
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
        item.description &&
        item.description.toLowerCase().includes(filterText.toLowerCase())
    );

  return (
    <div>
      {data && data.length == 0 && <div>List is empty, please fetch again</div>}
      {data && data.length > 0 && (
        <DataTable
          title={title}
          columns={columns}
          customStyles={customStyles}
          data={filteredRows}
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

export {MatchDetails};
