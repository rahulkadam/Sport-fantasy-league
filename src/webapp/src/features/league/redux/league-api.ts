import {Get, Post} from 'API';

export function joinLeague(leagueCode: any) {
  console.log('join league by this code' + leagueCode);
  return Post('/fantasy/league/join/bycode', {
    data: {leagueCode: leagueCode, add: 23},
  });
}

export function fetchUserRankingInLeague(leagueId: any) {
  return Get('/users/league/ranking/' + leagueId);
}

export function fetchActiveLeaguesList() {
  return Get('/leagues/list');
}

export function fetchUserLeaguesDetails() {
  console.log('fetchUserLeaguesDetails for 17');
  return Get('/fantasy/league/list/byuser/17');
}
