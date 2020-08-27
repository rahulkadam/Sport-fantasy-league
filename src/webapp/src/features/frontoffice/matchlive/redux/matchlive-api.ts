import {Get, Post} from 'API';

export function getLiveMatchStats(matchId: any) {
  return Post('/public/stats/list/playerScoreByMatch', {
    data: {id: matchId},
  });
}

export function getLivePlayerStats(playerId: any) {
  return Post('/public/stats/list/playerScoringHistory', {
    data: {id: playerId},
  });
}

export function getUserStats(userId: any, matchId: any) {
  return Post('/public/stats/list/userScoreHistoryByMatch', {
    data: {userTeamId: userId, matchId: matchId},
  });
}

export function getLiveMatches() {
  return Get('/public/home/matches/live');
}
