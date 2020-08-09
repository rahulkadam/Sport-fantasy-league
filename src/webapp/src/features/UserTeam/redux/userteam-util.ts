export function validateTeamCriteria(
  teamCriteria: any,
  playerList: any[]
): string[] {
  const error: string[] = [];
  if (!teamCriteria) return error;
  const maxPerTeam = teamCriteria.maxPlayerPerTeam;
  const totalCount = teamCriteria.totalPlayerCount;
  const totalCredit = teamCriteria.totalCredits;
  const playerCount = playerList.length;
  let teamValue = 0;
  playerList.forEach((player: any) => (teamValue = teamValue + player.value));
  const map = new Map();
  let maxValue = 0;
  let key = '';
  playerList.forEach((player: any) => {
    const teamList = player.teamsNameList;
    const type =
      teamList && teamList.length > 0 ? player.teamsNameList[0] : 'not found';
    if (map.get(type)) {
      const value = map.get(type) + 1;
      if (value > maxValue) {
        maxValue = value;
        key = type;
      }
      map.set(type, value);
    } else {
      map.set(type, 1);
    }
  });
  if (maxValue > maxPerTeam) {
    error.push('One Team can have max' + maxPerTeam + 'per squad');
  }
  if (totalCredit < teamValue) {
    error.push('Team value should not cross limit' + totalCredit);
  }

  if (totalCount != playerCount) {
    error.push('Player Count should match properly');
  }
  return error;
}

export function validatePlayerCriteria(
  playerCriteria: any,
  playerTypeMap: any
): string[] {
  const error: string[] = [];
  if (!playerCriteria) return error;
  const maxPerTeam = playerCriteria.maxPerTeam;
  const minPerTeam = playerCriteria.minPerTeam;
  const type = playerCriteria.type;
  const playerCountByType = playerTypeMap.get(type);
  if (playerCountByType > maxPerTeam) {
    error.push('Max ' + maxPerTeam + 'player allowed for ' + type);
  }
  if (playerCountByType < minPerTeam) {
    error.push('Min ' + minPerTeam + 'player should be in Team for ' + type);
  }
  return error;
}

export function validatePlayerCriteriaList(
  playerCriteriaList: any,
  playerList: any[]
): string[] {
  let error: string[] = [];
  const map = new Map();
  playerList.forEach((player: any) => {
    const type = player.type;
    if (map.get(type)) {
      const value = map.get(type) + 1;
      map.set(type, value);
    } else {
      map.set(type, 1);
    }
  });

  playerCriteriaList.forEach((playerCriteria: any) => {
    error = error.concat(validatePlayerCriteria(playerCriteria, map));
  });
  return error;
}

export function validateTeam(props: UserTeam): string[] {
  let error: string[] = [];
  const currentUserTeamPlayers = props.currentUserTeamPlayers;
  const gameCriteria = props.teamcriteria;
  if (!gameCriteria) {
    return error;
  }
  const teamCriteria = gameCriteria.teamCriteriaDTO;
  const playerCriteriaList = gameCriteria.playerCriteriaDTOList;
  if (!teamCriteria) return error;
  error = error.concat(
    validateTeamCriteria(teamCriteria, currentUserTeamPlayers)
  );
  if (!playerCriteriaList) return error;
  error = error.concat(
    validatePlayerCriteriaList(playerCriteriaList, currentUserTeamPlayers)
  );
  return error;
}
