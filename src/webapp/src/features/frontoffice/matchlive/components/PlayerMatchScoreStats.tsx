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

  function getNumber(number: any) {
    if (!isNaN(number)) {
      return number;
    }
    return 0;
  }

  function renderStatsNumber(total: any) {
    if (total > 0) {
      return <Badge variant="info">{total}</Badge>;
    }
    return <span>{total}</span>;
  }

  function renderStatsWithDash(total: any) {
    if (total > 0) {
      return <span>{total}</span>;
    }
    return <span>-</span>;
  }

  function customStrikeRate(row: any) {
    const total = getNumber(row.strikeRate);
    return renderStatsWithDash(total);
  }

  function customEconomy(row: any) {
    const total = getNumber(row.economy);
    return renderStatsWithDash(total);
  }

  function customWickets(row: any) {
    const total = getNumber(row.wicket);
    return renderStatsNumber(total);
  }

  function customRuns(row: any) {
    const total = getNumber(row.run_scored);
    return renderStatsNumber(total);
  }

  function customFielding(row: any) {
    const total =
      getNumber(row.catches) + getNumber(row.stumped) + getNumber(row.runout);
    return renderStatsNumber(total);
  }

  const columns: any[] = [
    {
      name: 'Player',
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
      width: '10%',
      sortable: true,
      left: true,
      cell: customPointScore,
    },
    {
      name: 'Runs',
      cell: customRuns,
      width: '10%',
      left: true,
      style: {
        'font-weight': 'bold',
      },
    },
    {
      name: 'Wicket',
      left: true,
      cell: customWickets,
      width: '10%',
      style: {
        'font-weight': 'bold',
      },
    },
    {
      name: 'Fielding',
      left: true,
      width: '10%',
      cell: customFielding,
      style: {
        'font-weight': 'bold',
      },
    },
    {
      name: 'SR',
      cell: customStrikeRate,
      left: true,
      width: '10%',
      style: {
        'font-weight': 'bold',
      },
    },
    {
      name: 'Eco',
      cell: customEconomy,
      left: true,
      width: '10%',
      style: {
        'font-weight': 'bold',
      },
    },
    {
      name: 'Match',
      width: '25%',
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
