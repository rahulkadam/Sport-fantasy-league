import React, {Fragment} from 'react';
import {TournamentPlayerList} from '../../UserTeam/component';
const PlayerStats = (props: PlayerStatsProps) => {
  const playerList = props.playerList;
  const fetchPlayerStats = props.action;

  function renderPlayerStats() {
    return (
      <TournamentPlayerList
        title="Tournament Player List"
        data={playerList}
        onRowSelected={() => {
          console.log('row selected');
        }}
        currentUserTeamPlayers={[]}
        playerStats={props.playerStats}
        fetchPlayerHistory={fetchPlayerStats}
      />
    );
  }

  return <div>{renderPlayerStats()}</div>;
};

export default PlayerStats;
