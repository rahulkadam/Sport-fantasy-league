import {Get, Post} from 'API';

export function joinLeague(leagueCode: any) {
  console.log('join league by this code' + leagueCode);
  return Post('/fantasy/league/join/bycode', {
    data: {leagueCode: leagueCode, add: 23},
  }).then(
    (data: any) => {
      return data;
    },
    (error: any) => {
      throw error;
    }
  );
}

export function fetchUserRankingInLeague(leagueId: any) {
  return Get('/users/league/ranking/' + leagueId).then(
    (data: any) => {
      return data;
    },
    (error: any) => {
      throw error;
    }
  );
}

export function fetchActiveLeaguesList() {
  return Get('/leagues/list').then(
    (data: any) => {
      return data;
    },
    (error: any) => {
      throw error;
    }
  );
}

export function fetchUserLeaguesDetails() {
  return Get('fantasy/league/list/byuser/17').then(
    (data: any) => {
      return data;
    },
    (error: any) => {
      throw error;
    }
  );
}
