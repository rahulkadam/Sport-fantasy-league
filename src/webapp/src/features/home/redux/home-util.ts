export function getGameCardPropsData(matchList: any) {
  if (!matchList) return [];
  return matchList.map((match: any) => {
    return {
      team1: match.team_host_name,
      team2: match.team_away_name,
      id: match.id,
      time: match.matchTime,
      venue: match.venue_name,
      tournament: match.tournament_name,
    };
  });
}
