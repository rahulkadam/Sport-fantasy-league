import React, {useMemo, useState} from 'react';
import DataTable from 'react-data-table-component';
import {Form, Badge, Row, Col} from 'react-bootstrap';
import {customStyles} from 'common/components/DataTable';
import {ExpandPlayerRow} from './ExpandPlayerRow';
import '../UserTeam.styles.scss';
import {FantasyDropDown, Logo} from 'common/components';
import {renderLogoByPLayerType} from '../redux';
import {isListEmpty} from 'common/util';
import {getLogoNameByTeam} from 'common/components/FantasyDropDown';
import {playerRowStyeForNew} from 'common/components/DataTable/TableConfig';
import {getCommonData} from '../../../common/redux';
import LoadingOverlay from 'react-loading-overlay';
import PlayerMatchScoreModal from '../../stats/components/PlayerMatchScoreModal';
import {minuscolor} from '@logos/index';
import {GA_Other_Event} from '../../../../common/config';

const UserTeamPlayerDetails = ({
  data,
  captionId,
  onRemoveRowAction,
  updateCaptionAction,
  editable,
  playerStats,
  fetchPlayerHistory,
}: UserTeamPlayerDetails) => {
  const [filterText, setFilterText] = React.useState('');
  const configProps = getCommonData();
  const [showPlayerHistory, setShowPlayerHistory] = useState(false);
  const handlePlayerHistoryShow = () => setShowPlayerHistory(true);
  const handlePlayerHistoryClose = () => setShowPlayerHistory(false);

  function fetchPlayerHistoryList(playerId: string) {
    GA_Other_Event('FETCH_PLAYER_STATS');
    fetchPlayerHistory(playerId);
    if (showPlayerHistory) {
      handlePlayerHistoryClose();
    } else {
      handlePlayerHistoryShow();
    }
  }

  function onRowClickedAction(row: any, e: any) {
    fetchPlayerHistory && fetchPlayerHistoryList(row.id);
  }

  let captainName = '';
  function getDropDownPlayerList() {
    const list =
      data &&
      data.map((item: any) => {
        if (item.id == captionId) {
          captainName = item.name;
        }
        return {
          id: item.id,
          name: item.name,
          selected: item.id == captionId,
        };
      });
    return list || [];
  }
  const playerList = getDropDownPlayerList();

  function customName(row: any) {
    return (
      <div
        className="nameColumn"
        onClick={() => {
          onRowClickedAction(row, '');
        }}>
        {captionId == row.id && <Badge variant={'success'}>C </Badge>}
        {row.name}
        <Logo logoSource={renderLogoByPLayerType(row.type)} width="20" />
      </div>
    );
  }

  function customTeam(row: any) {
    const teamName = !isListEmpty(row.teamsNameList)
      ? row.teamsNameList[0]
      : '';
    return (
      <div>
        <Logo logoSource={getLogoNameByTeam(teamName)} width="30" />
      </div>
    );
  }

  /**
   *
   * <Button
      size={'sm'}
      variant="outline-danger"
      onClick={() => onRemoveRowAction(row)}>
        X
      </Button>
   * @param row
   */
  function removeAction(row: any) {
    return (
      <div onClick={() => onRemoveRowAction(row)} className="removeIcon">
        <span onClick={() => onRemoveRowAction(row)} className="removeIcon">
          <Logo logoSource={minuscolor} width="20" />
        </span>
      </div>
    );
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

  const actionColumn: any[] = [
    {
      name: '',
      width: '10%',
      center: true,
      cell: removeAction,
    },
  ];

  const columns: any[] = [
    {
      name: 'TEAM',
      width: '15%',
      selector: 'teamsNameList',
      sortable: true,
      center: true,
      cell: customTeam,
    },
    {
      name: 'PLAYERS',
      selector: 'type',
      sortable: true,
      left: true,
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
      name: 'Country',
      selector: 'country',
      sortable: true,
      right: true,
      hide: 'sm',
    },
  ];

  const newColumns: any = onRemoveRowAction
    ? columns.concat(actionColumn)
    : columns;

  const renderCustomSearch = useMemo(() => {
    return (
      <div>
        <Row>
          <Col>
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              placeholder="Name"
              onChange={(e: any) => setFilterText(e.target.value)}
              value={filterText}
            />
          </Col>
          <Col>
            Captain <Badge variant="danger">(2X Pts)</Badge>
            {!editable && <Badge variant="success">{captainName}</Badge>}
            {editable && (
              <FantasyDropDown
                onSelect={(value: string) => {
                  updateCaptionAction(value);
                }}
                list={playerList}
                disabled={!editable}
              />
            )}
          </Col>
          {editable && (
            <Col>
              <Badge
                variant={playerList.length == 11 ? 'success' : 'danger'}
                className="playerCountTxt">
                {playerList.length}
              </Badge>
              <span className="playerCountTxt">11</span>
            </Col>
          )}
        </Row>
      </div>
    );
  }, [filterText, playerList]);

  const filteredRows =
    data &&
    data.filter(
      (item: any) =>
        item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
    );
  return (
    <div>
      <LoadingOverlay
        active={configProps.isLoading}
        spinner
        text="Loading Details ...">
        {renderPlayerHistoryDetails()}
        {data && data.length > 0 && (
          <DataTable
            noHeader
            columns={newColumns}
            customStyles={customStyles}
            fixedHeader
            fixedHeaderScrollHeight="680px"
            data={filteredRows}
            subHeader
            highlightOnHover
            conditionalRowStyles={playerRowStyeForNew}
            subHeaderComponent={renderCustomSearch}
            subHeaderAlign="left"
            expandableRows={false}
            expandableRowsComponent={<ExpandPlayerRow />}
            defaultSortField="isNew"
            defaultSortAsc={true}
          />
        )}
      </LoadingOverlay>
    </div>
  );
};

export {UserTeamPlayerDetails};
