import {Get, Post} from 'API';

export function joinLeague(leagueCode: any) {
  return Post('/fantasy/league/join/bycode', {
    data: {leagueCode: leagueCode, add: 8},
  });
}

export function fetchUserRankingInLeague(leagueId: any) {
  return Get('/users/league/ranking/' + leagueId);
}

export function fetchActiveLeaguesList() {
  return Get('/leagues/list');
}

export function fetchUserLeaguesDetails() {
  return Get('/fantasy/league/list/');
}

export function createLeague(request: CreateLeagueRequestObj) {
  return Post('/fantasy/league/create', {
    data: request,
  });
}
