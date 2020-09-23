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
import {Logo} from 'common/components';
import '../Match.styles.scss';
import {GA_Other_Event} from '../../../../common/config';
import {isUserLogin} from '../../../../API';

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
  const loggedUser = isUserLogin();

  function fetchPlayerHistoryList(matchId: string) {
    fetchMatchHistory(matchId);
    GA_Other_Event('FETCH_MATCH_STATS');
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

  function customMatchResult(row: any) {
    const result = row.matchResult || 'NA';
    return <div className="nameColumn">{result}</div>;
  }

  function customVenue(row: any) {
    return <div className="nameColumn">{row.venue_name}</div>;
  }

  function customOtherDetails(row: any) {
    return (
      <div className="nameColumn">
        {row.external_mid} ({row.state})
      </div>
    );
  }

  const columns = [
    {
      name: 'Name',
      selector: 'team_host_name',
      sortable: true,
      cell: customName,
      width: '30%',
    },
    {
      name: 'Time',
      selector: 'matchTime',
      grow: 2,
      sortable: true,
      cell: convertDateTime,
      width: '30%',
    },
    {
      name: 'Your Score',
      selector: 'userMatchScore',
      sortable: true,
      left: true,
      omit: !loggedUser || title == 'Fixture',
      style: {
        'font-weight': 'bold',
      },
      width: '20%',
    },
    {
      name: 'Match Result',
      selector: 'matchResult',
      left: true,
      cell: customMatchResult,
      omit: title == 'Fixture',
      width: '20%',
    },
    {
      name: 'Venue',
      selector: 'venue_name',
      sortable: true,
      left: true,
      omit: loggedUser && title != 'Fixture',
      cell: customVenue,
    },
    {
      name: 'ExternalId',
      selector: 'external_mid',
      sortable: true,
      right: true,
      cell: customOtherDetails,
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
              placeholder="Team Name"
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
        (item.team_host_name &&
          item.team_host_name
            .toLowerCase()
            .includes(filterText.toLowerCase())) ||
        (item.team_away_name &&
          item.team_away_name.toLowerCase().includes(filterText.toLowerCase()))
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
          defaultSortAsc={title == 'Fixture' ? true : false}
        />
      )}
    </div>
  );
};

export {MatchDetails};
