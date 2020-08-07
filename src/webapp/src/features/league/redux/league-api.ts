import {Get, Post} from 'API';
import {DefaultUserTeamId} from '../../../common/util';

export function joinLeague(leagueCode: any) {
  return Post('/fantasy/league/join/bycode', {
    data: {leagueCode: leagueCode, add: DefaultUserTeamId},
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
