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
