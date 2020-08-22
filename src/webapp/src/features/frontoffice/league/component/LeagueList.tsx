import React, {Fragment, useMemo} from 'react';
import {Row, Col, Form} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {customStyles} from 'common/components/DataTable';
import {ExpandLeagueRow} from './ExpandLeagueRow';
import {StatusMessage} from '../../../../common/components';

const LeagueList = (props: LeagueUserListProps) => {
  const userLeagueList: any = props.userleagueList || [];
  const [filterText, setFilterText] = React.useState('');

  const columns = [
    {
      name: 'NAME',
      selector: 'name',
      sortable: true,
      center: true,
    },
    {
      name: 'USERS',
      selector: 'totalUserCount',
      sortable: true,
      center: true,
    },
    {
      name: 'RANK',
      selector: 'totalUserCount',
      sortable: true,
      center: true,
    },
    {
      name: 'CODE',
      selector: 'leagueCode',
      center: true,
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
          placeholder="League Name"
          onChange={(e: any) => setFilterText(e.target.value)}
          value={filterText}
        />
      </div>
    );
  }, [filterText]);

  function renderLeagueList() {
    return (
      <Fragment>
        <div className="leagueAction">
          <StatusMessage type="info" text="My Leagues" />
        </div>
        {userLeagueList && userLeagueList.length > 0 && (
          <DataTable
            noHeader
            columns={columns}
            customStyles={customStyles}
            fixedHeader
            fixedHeaderScrollHeight="400px"
            data={filteredRows}
            subHeader
            subHeaderComponent={renderCustomSearch}
            subHeaderAlign="left"
            striped
            highlightOnHover
            expandableRows
            expandableRowsComponent={
              <ExpandLeagueRow
                fetchTeamByUser={props.fetchTeamListByUser}
                playerList={props.playerList}
              />
            }
            expandOnRowClicked
          />
        )}
      </Fragment>
    );
  }

  return <Fragment>{renderLeagueList()}</Fragment>;
};

export {LeagueList};
