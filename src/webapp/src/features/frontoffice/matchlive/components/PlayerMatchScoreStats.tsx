import React from 'react';
import DataTable from 'react-data-table-component';
import {customStyles} from 'common/components/DataTable';
import {StatusMessage} from 'common/components';
import {getCommonData} from '../../../common/redux';
import LoadingOverlay from 'react-loading-overlay';
const PlayerMatchScoreStats = ({data}: PlayerMatchScoreStatsProps) => {
  const configProps = getCommonData();
  const columns: any[] = [
    {
      name: 'Match',
      width: '15%',
      selector: 'matchDescription',
      sortable: true,
      center: true,
    },
    {
      name: 'PLAYER',
      selector: 'playerName',
      sortable: true,
      left: true,
    },
    {
      name: 'Points',
      selector: 'pointscore',
      sortable: true,
      left: true,
    },
    {
      name: 'Runs',
      selector: 'run_scored',
      sortable: true,
      left: true,
    },
    {
      name: 'Wicket',
      selector: 'wicket',
      sortable: true,
      left: true,
    },
    {
      name: 'Catch',
      selector: 'catches',
      sortable: true,
      left: true,
    },
  ];

  function renderNotExistList() {
    return (
      <div>
        <StatusMessage type="error" text="Stats does not exist" />
      </div>
    );
  }

  return (
    <div>
      <LoadingOverlay
        active={configProps.isLoading}
        spinner
        text="Loading Player Stats ...">
        {data && data.length == 0 && renderNotExistList()}
        {data && data.length > 0 && (
          <DataTable
            noHeader
            columns={columns}
            customStyles={customStyles}
            data={data}
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight="400px"
            defaultSortField="pointscore"
            defaultSortAsc={false}
          />
        )}
      </LoadingOverlay>
    </div>
  );
};

export default PlayerMatchScoreStats;