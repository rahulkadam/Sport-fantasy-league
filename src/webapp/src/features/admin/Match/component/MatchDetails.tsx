import React, {useMemo, useState} from 'react';
import DataTable from 'react-data-table-component';
import {Col, Form, Row} from 'react-bootstrap';
import {customStyles} from 'common/components/DataTable';
import PlayerMatchScoreModal from '../../../frontoffice/stats/components/PlayerMatchScoreModal';

const MatchDetails = ({
  data,
  title,
  fetchMatchHistory,
  playerStats,
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
      />
    );
  }
  function customName(row: any) {
    return (
      <div onClick={() => fetchPlayerHistoryList(row.id)}>
        {row.description} ({row.id})
      </div>
    );
  }

  function convertDateTime(row: any) {
    const dateTime = new Date(row.matchTime);
    return <div>{dateTime.toString()}</div>;
  }

  const columns = [
    {
      name: 'Name',
      selector: 'description',
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
      name: 'Tournament',
      selector: 'tournament_name',
      sortable: true,
      right: true,
      omit: true,
    },
    {
      name: 'Venue',
      selector: 'venue_name',
      sortable: true,
      right: true,
      omit: true,
    },
  ];

  function onRowClickedAction(row: any, e: any) {
    fetchPlayerHistoryList(row.id);
  }

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
          subHeader
          highlightOnHover
          subHeaderComponent={renderCustomSearch}
          subHeaderAlign="left"
          onRowClicked={onRowClickedAction}
        />
      )}
    </div>
  );
};

export {MatchDetails};
