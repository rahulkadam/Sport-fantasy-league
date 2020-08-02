import {Get, Post} from 'API';

export function createMatch(requestObject: CreateMatchRequestObject) {
  return Post('/fantasy/match/create', {
    data: {
      description: requestObject.description,
      matchTime: requestObject.isoMatchTime,
      venueId: requestObject.venueId,
      tournament_id: requestObject.tournamentId,
      team_host_id: requestObject.homeTeamId,
      team_away_id: requestObject.awayTeamId,
    },
  });
}

export function fetchAllMatchList() {
  return Get('/fantasy/match/list');
}
