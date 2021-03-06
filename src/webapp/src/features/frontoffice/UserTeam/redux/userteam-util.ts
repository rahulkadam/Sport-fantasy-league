import {colorarr, colorball, colorbat, colorwk} from '@logos/index';
import {isListEmpty} from 'common/util';

export function teamValueByPlayerList(playerList: any) {
  let teamValue = 0;
  if (!playerList) return teamValue;
  playerList.forEach((player: any) => (teamValue = teamValue + player.value));
  return teamValue;
}

export function getPlayerListByType(playerList: any, type: string) {
  const list: any[] = [];
  if (isListEmpty(playerList)) return list;
  playerList.forEach((player: any) => {
    const playerType = player.type;
    if (playerType == type) {
      list.push(player);
    }
  });
  return list;
}

export function getTeamWithMaxPlayer(playerList: any) {
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

  return {key: key, value: maxValue};
}

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
  const teamValue = teamValueByPlayerList(playerList);
  const maxPlayerTeam = getTeamWithMaxPlayer(playerList);
  if (maxPlayerTeam.value > maxPerTeam) {
    error.push(
      'select max ' +
        maxPerTeam +
        ' player from team (' +
        maxPlayerTeam.key +
        ')'
    );
  }
  if (totalCredit < teamValue) {
    error.push(
      'limit exceed (' +
        teamValue +
        '), Please form team with credit ' +
        totalCredit
    );
  }

  if (totalCount != playerCount) {
    const diff = totalCount - playerCount;
    const message =
      diff > 0
        ? 'please add ' + diff + ' more'
        : 'please remove ' + Math.abs(diff);
    error.push('Team should have ' + totalCount + ' player, ' + message);
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
  if (!playerCountByType || playerCountByType < minPerTeam) {
    error.push(type + ' : Please select atleast ' + minPerTeam);
  }
  if (playerCountByType > maxPerTeam) {
    error.push(type + ' : You should select only upto ' + maxPerTeam);
  }
  return error;
}

export function getPlayerMapByType(playerList: any) {
  const map = new Map();
  if (!playerList) return map;
  if (playerList.length == 0) return map;
  playerList.forEach((player: any) => {
    const type = player.type;
    if (map.get(type)) {
      const value = map.get(type) + 1;
      map.set(type, value);
    } else {
      map.set(type, 1);
    }
  });
  return map;
}

export function validatePlayerCriteriaList(
  playerCriteriaList: any,
  playerList: any[]
): string[] {
  let error: string[] = [];
  const map = getPlayerMapByType(playerList);
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

export function renderLogoByPLayerType(type: string) {
  switch (type) {
    case 'ALLROUNDER':
      return colorarr;
    case 'BOWLER':
      return colorball;
    case 'BATSMAN':
      return colorbat;
    case 'WICKETKEEPER':
      return colorwk;
  }
  return colorball;
}
