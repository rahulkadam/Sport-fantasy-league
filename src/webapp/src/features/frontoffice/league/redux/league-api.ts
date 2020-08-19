import {Get, Post} from 'API';

export function joinLeague(leagueCode: string, userId: number) {
  return Post('/fantasy/league/join/bycode', {
    data: {leagueCode: leagueCode, add: userId},
  });
}

export function fetchUserRankingInLeague(leagueId: any) {
  return Get('/users/league/ranking/' + leagueId);
}

export function fetchActiveLeaguesList() {
  return Get('/leagues/list');
}

export function fetchUserLeaguesDetails(userId: number) {
  return Get('/fantasy/league/list/byuser/' + userId);
}

export function createLeague(request: CreateLeagueRequestObj) {
  return Post('/fantasy/league/create', {
    data: request,
  });
}
