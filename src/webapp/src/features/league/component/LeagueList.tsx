import React, {Fragment, useMemo} from 'react';
import {Row, Col, Form} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {customStyles} from '../../../common/components/DataTable';
import {ExpandLeagueRow} from './ExpandLeagueRow';

const LeagueList = (props: LeagueUserListProps) => {
  const userLeagueList: any = props.userleagueList || [];
  const [filterText, setFilterText] = React.useState('');

  const columns = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
    },
    {
      name: 'Code',
      selector: 'leagueCode',
      sortable: true,
    },
    {
      name: 'Total User',
      selector: 'totalUserCount',
      sortable: true,
    },
    {
      name: 'Rank',
      selector: 'totalUserCount',
      sortable: true,
    },
  ];

  const filteredRows =
    userLeagueList &&
    userLeagueList.filter(
      (item: any) =>
        item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
    );

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

  function renderLeagueList() {
    return (
      <Fragment>
        {userLeagueList.length == 0 && (
          <div>LIst is empty, please fetch again</div>
        )}
        {userLeagueList && userLeagueList.length > 0 && (
          <DataTable
            title="League List"
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
            expandableRows
            expandableRowsComponent={
              <ExpandLeagueRow
                fetchTeamByUser={props.fetchTeamListByUser}
                playerList={props.playerList}
              />
            }
            expandOnRowClicked
            onRowClicked={(row: any, action) => {
              console.log('clicked');
            }}
          />
        )}
      </Fragment>
    );
  }

  return <Fragment>{renderLeagueList()}</Fragment>;
};

export {LeagueList};
