import {Get} from 'API';

export function joinLeague(leagueCode: any) {
  return Get('/league/join/' + leagueCode).then(
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
  return Get('fantasy/league/get/28').then(
    (data: any) => {
      return data;
    },
    (error: any) => {
      throw error;
    }
  );
}
