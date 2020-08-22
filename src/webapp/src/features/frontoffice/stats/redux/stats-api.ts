import {Post} from 'API';

export function getMatchStats(matchId: any) {
  return Post('/public/stats/list/playerScoreByMatch', {
    data: {id: matchId},
  });
}

export function getPlayerStats(playerId: any) {
  return Post('/public/stats/list/playerScoringHistory', {
    data: {id: playerId},
  });
}

export function getUserStats(userId: any, matchId: any) {
  return Post('/public/stats/list/userScoreHistoryByMatch', {
    data: {userTeamId: userId, matchId: matchId},
  });
}
