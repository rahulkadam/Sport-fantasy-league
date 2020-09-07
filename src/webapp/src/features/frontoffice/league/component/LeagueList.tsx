import React, {Fragment} from 'react';
import {Badge} from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import {customStyles} from 'common/components/DataTable';
import {ExpandLeagueRow} from './ExpandLeagueRow';
import {Logo} from 'common/components';
import {lockcolor} from '@logos/index';
import {largeRowStyles} from 'common/components/DataTable/TableConfig';
import './LeagueComponent.styles.scss';

const LeagueList = (props: LeagueUserListProps) => {
  const userLeagueList: any = props.userleagueList || [];

  function customName(row: any) {
    return (
      <div className="leagueNameColumn">
        {!row.publicLeague && <Logo logoSource={lockcolor} width="20" />}
        {row.name}
      </div>
    );
  }

  function customTotalUser(row: any) {
    return (
      <div className="leagueNameColumn">
        <Badge variant="info">{row.totalUserCount} </Badge>
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
      cell: customTotalUser,
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
      style: {'font-weight': 'bold'},
    },
  ];

  function renderLeagueList() {
    return (
      <Fragment>
        {userLeagueList && userLeagueList.length > 0 && (
          <DataTable
            noHeader
            columns={columns}
            customStyles={customStyles}
            fixedHeader
            fixedHeaderScrollHeight="500px"
            data={userLeagueList}
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
