import React, {useState, useMemo} from 'react';
import DataTable from 'react-data-table-component';
import {Form, Row, Col, Button} from 'react-bootstrap';
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
import PlayerMatchScoreModal from '../../stats/components/PlayerMatchScoreModal';
import {playerRowStyeForNew} from '../../../../common/components/DataTable/TableConfig';

const TournamentPlayerList = ({
  data,
  onRowSelected,
  currentUserTeamPlayers,
  playerStats,
  fetchPlayerHistory,
}: UserTeamPlayerDetails) => {
  const [filterText, setFilterText] = React.useState('');
  const [filterPlayerType, setFilterPlayerType] = React.useState('ALL');
  const [filterByTeam, setFilterByTeam] = React.useState('ALL');
  const [filterByCountry, setFilterByCountry] = React.useState('ALL');
  const currentUserPlayerMap = returnMapFromList(currentUserTeamPlayers);
  const [toggleCleared, setToggleCleared] = useState(false);
  const teamValueByPlayers = teamValueByPlayerList(currentUserTeamPlayers);
  const [showPlayerHistory, setShowPlayerHistory] = useState(false);
  const handlePlayerHistoryShow = () => setShowPlayerHistory(true);
  const handlePlayerHistoryClose = () => setShowPlayerHistory(false);

  function fetchPlayerHistoryList(playerId: string) {
    fetchPlayerHistory(playerId);
    if (showPlayerHistory) {
      handlePlayerHistoryClose();
    } else {
      handlePlayerHistoryShow();
    }
  }

  function renderPlayerHistoryDetails() {
    if (!showPlayerHistory) return;
    return (
      <PlayerMatchScoreModal
        handleClose={handlePlayerHistoryClose}
        show={showPlayerHistory}
        data={playerStats}
        title="Player Stats"
      />
    );
  }

  function onRowClickedAction(row: any, e: any) {
    console.log('row clicked');
    // fetchPlayerHistoryList(row.id);
  }

  function fetchPlayerData(row: any) {
    fetchPlayerHistoryList(row.id);
  }

  function customName(row: any) {
    return (
      <div
        className="nameColumn"
        onClick={() => {
          fetchPlayerData(row);
        }}>
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
      <div onClick={() => onRowSelected([row])} className="removeIcon">
        <Button
          size={'sm'}
          variant="outline-success"
          onClick={() => onRowSelected([row])}>
          +
        </Button>
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
      name: 'TEAM',
      width: '15%',
      selector: 'teamsNameList',
      center: true,
      sortable: true,
      cell: customTeam,
    },
    {
      name: 'PLAYERS',
      selector: 'type',
      sortable: true,
      cell: customName,
    },
    {
      name: 'TYPE',
      selector: 'type',
      sortable: true,
      hide: 'sm',
    },
    {
      name: 'CREDITS',
      selector: 'value',
      width: '20%',
      center: true,
      sortable: true,
      style: {'font-weight': 'bold'},
    },
    {
      name: 'COUNTRY',
      selector: 'country',
      sortable: true,
      right: true,
      hide: 'sm',
    },
  ];

  function checkDisabledPlayer() {
    return currentUserTeamPlayers.length == 15 || teamValueByPlayers > 150;
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
      {renderPlayerHistoryDetails()}
      {data && data.length > 0 && (
        <DataTable
          noHeader
          columns={newColumns}
          customStyles={customStyles}
          data={filteredRows}
          fixedHeader
          fixedHeaderScrollHeight="480px"
          subHeader
          subHeaderComponent={renderCustomSearch}
          subHeaderAlign="left"
          striped
          highlightOnHover
          expandableRows={false}
          conditionalRowStyles={playerRowStyeForNew}
          expandableRowsComponent={<ExpandPlayerRow />}
          clearSelectedRows={toggleCleared}
          selectableRowsHighlight={false}
          selectableRowsNoSelectAll={true}
          expandOnRowClicked
          onRowClicked={onRowClickedAction}
          defaultSortField="value"
          defaultSortAsc={false}
        />
      )}
    </div>
  );
};

export {TournamentPlayerList};
