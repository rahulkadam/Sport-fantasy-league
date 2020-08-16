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

export function arrayRotate(arr: any) {
  if (!arr || arr.length == 0) return [];
  const arr1 = arr.slice();
  arr1.push(arr1.shift(1));
  return arr1;
}
