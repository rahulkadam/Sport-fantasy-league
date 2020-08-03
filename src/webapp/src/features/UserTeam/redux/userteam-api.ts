import {Get, Post} from 'API';

export function saveTeamForUser(userteamId: number, playerList: any) {
  const playerIds: any = [];
  playerList.forEach((player: any) => {
    playerIds.push(player.id);
  });
  return Post('/fantasy/userteam/add/player', {
    data: {addto: userteamId, addList: playerIds},
  });
}

export function createTeamForUser(userId: number, name: string) {
  return Post('/fantasy/userteam/create', {
    data: {userId: userId, name: name},
  });
}

export function fetchAllPlayerlist() {
  return Get('/fantasy/player/list');
}

export function fetchPlayerlistByUser(id: number) {
  return Get('/fantasy/player/list/byuser/' + id);
}

export function fetchUserTeamByUser(id: number) {
  return Get('/fantasy/userteam/get/user/' + id);
}
