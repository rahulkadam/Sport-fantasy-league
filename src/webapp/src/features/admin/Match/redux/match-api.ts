import {Get, Post} from 'API';

export function createMatch(
  name: string,
  country: string,
  value: number,
  type: string
) {
  return Post('/fantasy/match/create', {
    data: {name: name, country: country, value: value, type: type},
  });
}

export function fetchAllMatchList() {
  return Get('/fantasy/match/list');
}
