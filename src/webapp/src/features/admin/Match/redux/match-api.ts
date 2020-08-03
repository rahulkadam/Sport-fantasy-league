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

export function uploadMatchPlayerPoints(
  request: PlayerMatchPointRequestObject
) {
  return Post('/fantasy/match/playerscore/upload', {
    data: {
      matchId: request.matchId,
      playerId: request.playerId,
      pointscore: request.points,
      run_scored: request.runs,
      wicket: request.wickets,
      catches: request.catches,
    },
  });
}

export function uploadMatchResult(request: MatchResultObject) {
  return Post('/fantasy/matchdetails/upload/matchresult', {
    data: {
      description: request.description,
      matchId: request.matchId,
      team_winner_id: request.team_winner_id,
      matchPlayerId: request.matchPlayerId,
    },
  });
}
