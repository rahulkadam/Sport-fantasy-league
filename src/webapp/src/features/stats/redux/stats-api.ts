import {Post} from 'API';

export function getMatchStats(matchId: any) {
  return Post('/public/stats/list/userScoreHistoryByMatch', {
    data: {id: matchId},
  });
}

export function getPlayerStats(playerId: any) {
  return Post('/public/stats/list/userScoreHistoryByMatch', {
    data: {id: playerId},
  });
}

export function getUserStats(userId: any) {
  return Post('/public/stats/list/userScoreHistoryByMatch', {
    data: {id: userId},
  });
}
