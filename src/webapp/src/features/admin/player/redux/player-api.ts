import {Get, Post} from 'API';

export function createPlayer(
  name: string,
  country: string,
  value: number,
  type: string
) {
  return Post('/fantasy/player/create', {
    data: {name: name, country: country, value: value, type: type},
  });
}

export function fetchAllPlayerList() {
  return Get('/fantasy/player/list');
}
export function addTeamToPlayer(playerId: number, teamId: number) {
  return Post('/fantasy/player/add/team', {
    data: {addTo: playerId, add: teamId},
  });
}

export function addExternalIdToPlayer(playerId: any, externalId: any) {
  return Post('/fantasy/player/update/externalid', {
    data: {playerId: playerId, externalId: externalId},
  });
}
