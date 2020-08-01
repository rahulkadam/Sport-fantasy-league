import {Get, Post} from 'API';

export function createTeam(name: string, country: string, owner: string) {
  return Post('/fantasy/team/create', {
    data: {name: name, country: country, owner: owner},
  });
}

export function fetchAllTeamList() {
  return Get('/fantasy/team/list');
}
