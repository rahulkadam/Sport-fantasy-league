import React from 'react';
import DataTable from 'react-data-table-component';
import {customStyles} from 'common/components/DataTable';
import {StatusMessage} from 'common/components';
import {getCommonData} from '../../../common/redux';
import LoadingOverlay from 'react-loading-overlay';
import {Badge} from 'react-bootstrap';
import {largeRowStyles} from 'common/components/DataTable/TableConfig';
import {getUserTeamData} from '../../UserTeam/redux';
import {returnMapFromList} from 'common/util';

const PlayerMatchScoreStats = ({data}: PlayerMatchScoreStatsProps) => {
  const configProps = getCommonData();
  const userteamDataProps = getUserTeamData();
  const currentUserTeamPlayers = userteamDataProps.userTeamPlayers;
  const playerTeamMap = returnMapFromList(currentUserTeamPlayers);

  function customPointScore(row: any) {
    let variant = row.pointscore > 20 ? 'success' : 'warning';
    if (variant == 'warning') {
      variant = row.pointscore <= 0 ? 'danger' : 'warning';
    }
    return <Badge variant={variant}>{row.pointscore}</Badge>;
  }

  function customPlayerName(row: any) {
    const isAvailable = playerTeamMap.get(row.playerId);
    return (
      <div className="nameColumn">
        {isAvailable && <span className="ownedPlayer">{row.playerName}</span>}
        {!isAvailable && row.playerName}
      </div>
    );
  }
  const columns: any[] = [
    {
      name: 'PLAYER',
      selector: 'playerName',
      sortable: true,
      left: true,
      style: {
        'font-weight': 'bold',
      },
      width: '15%',
      cell: customPlayerName,
    },
    {
      name: 'Points',
      selector: 'pointscore',
      width: '5%',
      sortable: true,
      left: true,
      cell: customPointScore,
    },
    {
      name: 'Runs',
      selector: 'run_scored',
      sortable: true,
      width: '5%',
      left: true,
      style: {
        'font-weight': 'bold',
      },
    },
    {
      name: 'Wicket',
      selector: 'wicket',
      sortable: true,
      left: true,
      width: '5%',
      style: {
        'font-weight': 'bold',
      },
    },
    {
      name: 'Catch',
      selector: 'catches',
      sortable: true,
      left: true,
      width: '5%',
      style: {
        'font-weight': 'bold',
      },
    },
    {
      name: 'Match',
      width: '15%',
      selector: 'matchDescription',
      sortable: true,
      center: true,
      style: {
        'font-weight': 'bold',
      },
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
            conditionalRowStyles={largeRowStyles}
            data={data}
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight="600px"
            defaultSortField="pointscore"
            defaultSortAsc={false}
          />
        )}
      </LoadingOverlay>
    </div>
  );
};

export default PlayerMatchScoreStats;
