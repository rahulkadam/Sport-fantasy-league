import React from 'react';
import DataTable from 'react-data-table-component';
import {customStyles} from 'common/components/DataTable';
const PlayerMatchScoreStats = ({data}: PlayerMatchScoreStatsProps) => {
  const data1 = [
    {
      id: 1,
      playerName: 'Sachin',
      matchDescription: 'MI VS CSK',
      pointscore: 23,
    },
    {
      id: 2,
      playerName: 'Sachin',
      matchDescription: 'MI VS CSK',
      pointscore: 23,
    },
    {
      id: 3,
      playerName: 'Sachin',
      matchDescription: 'MI VS CSK',
      pointscore: 23,
    },
  ];

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
  ];
  return (
    <div>
      Player LIst
      {data1 && data1.length > 0 && (
        <DataTable
          noHeader
          columns={columns}
          customStyles={customStyles}
          data={data1}
        />
      )}
    </div>
  );
};

export default PlayerMatchScoreStats;
