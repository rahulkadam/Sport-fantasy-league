import {Get} from 'API';

export function fetchTopPerformingPlayer() {
  return Get('/users/league/ranking/');
}

export function fetchMostPickedPlayer() {
  return Get('/users/league/ranking/');
}

export function fetchUpcomingMatches() {
  return Get('/public/home/comingmatches');
}

export function fetchTopScoreUserGlobally() {
  return Get('/users/league/ranking/');
}
