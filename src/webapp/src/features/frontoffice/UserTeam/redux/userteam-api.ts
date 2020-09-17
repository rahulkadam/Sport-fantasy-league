import {Get, Post} from 'API';

export function saveTeamForUser(
  userteamId: number,
  playerList: any,
  captainId: any
) {
  const playerIds: any = [];
  playerList.forEach((player: any) => {
    playerIds.push(player.id);
  });
  return Post('/fantasy/userteam/add/player', {
    data: {addTo: userteamId, addList: playerIds, captainId: captainId},
  });
}

export function createTeamForUser(name: string) {
  return Post('/fantasy/userteam/create', {
    data: {name: name},
  });
}

export function fetchAllPlayerlist() {
  return Get('/fantasy/player/list');
}

export function fetchPlayerlistByUserForLeague(id: number) {
  return Get('/fantasy/player/list/byuser/' + id);
}

export function fetchUserTeamByUser(id: number) {
  return Get('/fantasy/userteam/get/user/' + id);
}

export function fetchUserTeamFullDataByUser(id: number) {
  return Get('/fantasy/userteam/get/userteam/data/' + id);
}

export function fetchGameCriteriaByName(name: string) {
  return Get('/fantasy/game/get/byname/' + name);
}
