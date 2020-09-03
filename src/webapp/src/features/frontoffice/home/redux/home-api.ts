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

export function fetchUpcomingAllMatches() {
  return Get('/public/home/comingAllmatches');
}

export function fetchPublicLeague() {
  return Get('/public/home/list/public');
}

export function getUserDashboard() {
  return Get('/fantasy/home/user/dashboard');
}

export function fetchTopScoreUserGlobally() {
  return Get('/users/league/ranking/');
}

export function fetchFantasyNotice() {
  return Get('/public/home/notice/active/list');
}
