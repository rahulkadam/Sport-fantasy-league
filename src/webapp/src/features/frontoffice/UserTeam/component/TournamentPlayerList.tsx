import React, {useState, useMemo, Fragment} from 'react';
import DataTable from 'react-data-table-component';
import {Form, Row, Col, Badge} from 'react-bootstrap';
import {customStyles} from 'common/components/DataTable';
import {isListEmpty, returnMapFromList} from 'common/util';
import {ExpandPlayerRow} from './ExpandPlayerRow';
import {FantasyDropDown, Logo} from 'common/components';
import {
  countryListWithAll,
  getLogoNameByTeam,
  PlayerTypeListWithALl,
  teamListWithALl,
} from 'common/components/FantasyDropDown';
import {renderLogoByPLayerType, teamValueByPlayerList} from '../redux';
import {pluscolor} from '@logos/index';

const TournamentPlayerList = ({
  data,
  title,
  onRowSelected,
  currentUserTeamPlayers,
}: UserTeamPlayerDetails) => {
  const [filterText, setFilterText] = React.useState('');
  const [filterPlayerType, setFilterPlayerType] = React.useState('ALL');
  const [filterByTeam, setFilterByTeam] = React.useState('ALL');
  const [filterByCountry, setFilterByCountry] = React.useState('ALL');
  const currentUserPlayerMap = returnMapFromList(currentUserTeamPlayers);
  const [toggleCleared, setToggleCleared] = useState(false);
  const teamValueByPlayers = teamValueByPlayerList(currentUserTeamPlayers);

  function customName(row: any) {
    return (
      <div className="nameColumn">
        {row.name}
        <Logo logoSource={renderLogoByPLayerType(row.type)} width="15" />
      </div>
    );
  }

  function customTeam(row: any) {
    const teamName = !isListEmpty(row.teamsNameList)
      ? row.teamsNameList[0]
      : '';
    return (
      <div>
        <Logo logoSource={getLogoNameByTeam(teamName)} width="25" />
      </div>
    );
  }

  function addAction(row: any) {
    return (
      <div>
        <span onClick={() => onRowSelected([row])} className="removeIcon">
          <Logo logoSource={pluscolor} width="30" />
        </span>
      </div>
    );
  }

  const actionColumn: any[] = [
    {
      name: '',
      width: '10%',
      center: true,
      cell: addAction,
    },
  ];

  const columns = [
    {
      name: 'Team',
      width: '15%',
      selector: 'teamsNameList',
      center: true,
      sortable: true,
      cell: customTeam,
    },
    {
      name: 'Player',
      selector: 'type',
      sortable: true,
      cell: customName,
    },
    {
      name: 'Type',
      selector: 'type',
      sortable: true,
      hide: 'sm',
    },
    {
      name: 'Value',
      selector: 'value',
      width: '10%',
      sortable: true,
      style: {'font-weight': 'bold'},
    },
    {
      name: 'Country',
      selector: 'country',
      sortable: true,
      right: true,
      hide: 'sm',
    },
  ];

  function checkDisabledPlayer() {
    return currentUserTeamPlayers.length == 110 || teamValueByPlayers > 1000;
  }
  const newColumns: any = checkDisabledPlayer()
    ? columns
    : columns.concat(actionColumn);

  const renderCustomSearch = useMemo(() => {
    return (
      <div>
        <Row>
          <Col>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              placeholder="Player Name"
              onChange={(e: any) => setFilterText(e.target.value)}
              value={filterText}
            />
          </Col>
          <Col>
            <Form.Label>Type</Form.Label>
            <FantasyDropDown
              onSelect={(value: string) => {
                setFilterPlayerType(value);
              }}
              list={PlayerTypeListWithALl}
            />
          </Col>
          <Col>
            <Form.Label>Team</Form.Label>
            <FantasyDropDown
              onSelect={(value: string) => {
                setFilterByTeam(value);
              }}
              list={teamListWithALl}
            />
          </Col>
          <Col>
            <Form.Label>Country</Form.Label>
            <FantasyDropDown
              onSelect={(value: string) => {
                setFilterByCountry(value);
              }}
              list={countryListWithAll}
            />
          </Col>
        </Row>
      </div>
    );
  }, [filterText]);

  function isPlayerExistInUserTeam(row: any) {
    return currentUserPlayerMap.get(row.id);
  }

  const filteredRows =
    data &&
    data.filter((row: any) => {
      const userSearchText = filterText.toLowerCase();
      const name = row.name || '';
      const teamList = row.teamsNameList
        ? row.teamsNameList.toLocaleString().toLowerCase()
        : '';
      const isvalid = name.toLowerCase().includes(userSearchText);
      const isTypeValid =
        filterPlayerType == 'ALL' || filterPlayerType.includes(row.type);
      const isCountryValid =
        filterByCountry == 'ALL' ||
        filterByCountry.toLowerCase().includes(row.country.toLowerCase());
      const isTeamValid =
        filterByTeam == 'ALL' || filterByTeam.toLowerCase().includes(teamList);
      return (
        isvalid &&
        !isPlayerExistInUserTeam(row) &&
        isTypeValid &&
        isTeamValid &&
        isCountryValid
      );
    });

  return (
    <div>
      {data && data.length > 0 && (
        <DataTable
          noHeader
          columns={newColumns}
          customStyles={customStyles}
          data={filteredRows}
          fixedHeader
          fixedHeaderScrollHeight="300px"
          pagination={false}
          paginationPerPage={50}
          subHeader
          subHeaderComponent={renderCustomSearch}
          subHeaderAlign="left"
          striped
          highlightOnHover
          expandableRows={false}
          expandableRowsComponent={<ExpandPlayerRow />}
          clearSelectedRows={toggleCleared}
          selectableRowsHighlight={false}
          selectableRowsNoSelectAll={true}
        />
      )}
    </div>
  );
};

export {TournamentPlayerList};
