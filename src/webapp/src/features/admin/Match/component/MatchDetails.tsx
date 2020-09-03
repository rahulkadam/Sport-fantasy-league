import React, {useMemo, useState} from 'react';
import DataTable from 'react-data-table-component';
import {Col, Form, Row} from 'react-bootstrap';
import {customStyles} from 'common/components/DataTable';
import PlayerMatchScoreModal from '../../../frontoffice/stats/components/PlayerMatchScoreModal';
import {getTime} from 'common/util';
import {
  getLogoNameByTeam,
  getShortNameByTeam,
} from 'common/components/FantasyDropDown';
import {largeRowStyles} from 'common/components/DataTable/TableConfig';
import {Logo} from '../../../../common/components';

const MatchDetails = ({
  data,
  title,
  fetchMatchHistory,
  playerStats,
  showExtraData,
}: MatchDetailsProps) => {
  const [filterText, setFilterText] = React.useState('');
  const [showPlayerHistory, setShowPlayerHistory] = useState(false);
  const handlePlayerHistoryShow = () => setShowPlayerHistory(true);
  const handlePlayerHistoryClose = () => setShowPlayerHistory(false);

  function fetchPlayerHistoryList(matchId: string) {
    fetchMatchHistory(matchId);
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
        title={title}
      />
    );
  }
  function customName(row: any) {
    return (
      <div
        className="nameColumn"
        onClick={() => fetchPlayerHistoryList(row.id)}>
        <Logo logoSource={getLogoNameByTeam(row.team_host_name)} width="20" />
        {getShortNameByTeam(row.team_host_name)} Vs{' '}
        {getShortNameByTeam(row.team_away_name)}
        <Logo logoSource={getLogoNameByTeam(row.team_away_name)} width="20" />
        {showExtraData && <span>({row.id})</span>}
      </div>
    );
  }

  function convertDateTime(row: any) {
    return <div className="nameColumn">{getTime(row.matchTime)}</div>;
  }

  const columns = [
    {
      name: 'Name',
      selector: 'team_host_name',
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
      omit: true,
    },
    {
      name: 'Away Team',
      selector: 'team_away_name',
      sortable: true,
      right: true,
      omit: true,
    },
    {
      name: 'Match Result',
      selector: 'matchResult',
      right: true,
    },
    {
      name: 'Venue',
      selector: 'venue_name',
      sortable: true,
      right: true,
    },
    {
      name: 'ExternalId',
      selector: 'external_mid',
      sortable: true,
      right: true,
      omit: !showExtraData,
    },
  ];

  const renderCustomSearch = useMemo(() => {
    return (
      <div>
        <Row>
          <Col>
            <Form.Control
              type="text"
              size="sm"
              placeholder="Match"
              onChange={(e: any) => setFilterText(e.target.value)}
              value={filterText}
            />
          </Col>
        </Row>
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
      {renderPlayerHistoryDetails()}
      {data && data.length > 0 && (
        <DataTable
          noHeader={true}
          columns={columns}
          customStyles={customStyles}
          data={filteredRows}
          fixedHeader
          fixedHeaderScrollHeight="400px"
          conditionalRowStyles={largeRowStyles}
          subHeader
          highlightOnHover
          subHeaderComponent={renderCustomSearch}
          subHeaderAlign="left"
          defaultSortField="matchTime"
          defaultSortAsc={true}
        />
      )}
    </div>
  );
};

export {MatchDetails};
