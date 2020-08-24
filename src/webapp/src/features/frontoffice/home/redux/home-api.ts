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

export function fetchPublicLeague() {
  return Get('/fantasy/league/list/public');
}

export function getUserDashboard() {
  return Get('/public/home/user/dashboard');
}

export function fetchTopScoreUserGlobally() {
  return Get('/users/league/ranking/');
}
