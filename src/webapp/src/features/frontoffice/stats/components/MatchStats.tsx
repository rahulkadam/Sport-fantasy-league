import React from 'react';
import {MatchDetails} from '../../../admin/Match/component';
const MatchStats = (props: MatchStatsProps) => {
  const matchList = props.data;
  const fetchMatchStats = props.action;

  function renderMatchListView() {
    if (!matchList || matchList.length == 0) return;
    return (
      <div className="container">
        <MatchDetails
          title="Matches"
          data={matchList}
          playerStats={props.playerStats}
          fetchMatchHistory={fetchMatchStats}
        />
      </div>
    );
  }

  return <div>{renderMatchListView()}</div>;
};

export default MatchStats;
