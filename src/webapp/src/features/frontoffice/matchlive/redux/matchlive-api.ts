import {Get, Post} from 'API';

export function getLiveMatches() {
  return Get('/public/home/matches/live');
}

export function getPlayerScoreByLiveMatches() {
  return Post('/public/stats/list/playerScoreByLiveMatch');
}

export function fetchUserTeamForLiveMatch() {
  return Post('/public/stats/getUserTeamByLiveMatch', {
    data: {id: 12398},
  });
}
