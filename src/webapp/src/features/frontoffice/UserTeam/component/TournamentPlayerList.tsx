import React, {useState, useMemo, Fragment} from 'react';
import DataTable from 'react-data-table-component';
import {Form, Row, Col, Badge} from 'react-bootstrap';
import {customStyles} from 'common/components/DataTable';
import {returnMapFromList} from 'common/util';
import {ExpandPlayerRow} from './ExpandPlayerRow';
import {FantasyDropDown, Logo} from 'common/components';
import {
  countryListWithAll,
  PlayerTypeListWithALl,
  teamListWithALl,
} from 'common/components/FantasyDropDown';
import {renderLogoByPLayerType, teamValueByPlayerList} from '../redux';
import {Icon} from '../../../../common/styles/Icon';

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
      <div>
        <Logo logoSource={renderLogoByPLayerType(row.type)} width="15" />
        {row.name}
      </div>
    );
  }

  function addAction(row: any) {
    return (
      <div>
        <Icon
          name="add"
          onClick={() => {
            onRowSelected([row]);
          }}
          className="removeIcon"
        />
      </div>
    );
  }

  const actionColumn: any[] = [
    {
      name: 'Action',
      width: '5%',
      cell: addAction,
    },
  ];

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
      width: '5%',
      sortable: true,
    },
    {
      name: 'Team',
      selector: 'teamsNameList',
      sortable: true,
      right: true,
      hide: 'sm',
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
    return currentUserTeamPlayers.length == 11 || teamValueByPlayers > 100;
  }
  const newColumns: any = checkDisabledPlayer()
    ? columns
    : actionColumn.concat(columns);

  function onRowSelectedAction(state: any) {
    setToggleCleared(!toggleCleared);
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
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Player Name"
              onChange={(e: any) => setFilterText(e.target.value)}
              value={filterText}
            />
          </Col>
          <Col>
            <FantasyDropDown
              onSelect={(value: string) => {
                setFilterPlayerType(value);
              }}
              list={PlayerTypeListWithALl}
            />
          </Col>
          <Col>
            <FantasyDropDown
              onSelect={(value: string) => {
                setFilterByTeam(value);
              }}
              list={teamListWithALl}
            />
          </Col>
          <Col>
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
      {data && data.length == 0 && <div>LIst is empty, please fetch again</div>}
      {data && data.length > 0 && (
        <DataTable
          title={title}
          columns={newColumns}
          customStyles={customStyles}
          data={filteredRows}
          onRowClicked={onRowClickedAction}
          pagination
          paginationPerPage={50}
          paginationResetDefaultPage
          subHeader
          subHeaderComponent={renderCustomSearch}
          subHeaderAlign="left"
          striped
          highlightOnHover
          expandableRows
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
