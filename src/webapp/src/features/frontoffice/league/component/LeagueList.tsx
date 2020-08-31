import React, {Fragment, useMemo} from 'react';
import {Form, Badge} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {customStyles} from 'common/components/DataTable';
import {ExpandLeagueRow} from './ExpandLeagueRow';
import {Logo, StatusMessage} from 'common/components';
import {lockcolor} from '@logos/index';
import {largeRowStyles} from 'common/components/DataTable/TableConfig';
import './LeagueComponent.styles.scss';

const LeagueList = (props: LeagueUserListProps) => {
  const userLeagueList: any = props.userleagueList || [];
  const [filterText, setFilterText] = React.useState('');

  function customName(row: any) {
    return (
      <div className="leagueNameColumn">
        {!row.publicLeague && <Logo logoSource={lockcolor} width="15" />}
        {row.name}
      </div>
    );
  }

  function customRank(row: any) {
    const userRank = row.userRank;
    const totalUser = row.totalUserCount;
    const rankBadge =
      totalUser < 3 || totalUser / 2 > userRank ? 'success' : 'danger';
    return (
      <div className="leagueNameColumn">
        <Badge variant={rankBadge}>{row.userRank} </Badge>
      </div>
    );
  }

  const columns = [
    {
      name: 'NAME',
      selector: 'name',
      sortable: true,
      left: true,
      cell: customName,
    },
    {
      name: 'USERS',
      selector: 'totalUserCount',
      sortable: true,
      center: true,
    },
    {
      name: 'RANK',
      selector: 'userRank',
      sortable: true,
      center: true,
      cell: customRank,
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
            fixedHeaderScrollHeight="500px"
            data={filteredRows}
            subHeader
            subHeaderComponent={renderCustomSearch}
            conditionalRowStyles={largeRowStyles}
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
            defaultSortField="publicLeague"
            defaultSortAsc={true}
          />
        )}
      </Fragment>
    );
  }

  return <Fragment>{renderLeagueList()}</Fragment>;
};

export {LeagueList};
