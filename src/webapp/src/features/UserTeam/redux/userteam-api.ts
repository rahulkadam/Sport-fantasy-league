import {Get, Post} from 'API';

export function joinLeague(leagueCode: any) {
  return Post('/fantasy/league/join/bycode', {
    data: {leagueCode: leagueCode, add: 23},
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
