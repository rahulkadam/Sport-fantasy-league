import {Get, Post} from 'API';

export function createTournament(
  name: string,
  country: string,
  sportName: string
) {
  return Post('/fantasy/tournament/create', {
    data: {name: name, country: country, sportName: sportName},
  });
}

export function fetchAllTournamentList() {
  return Get('/fantasy/tournament/list');
}

export function fetchTop10Error() {
  return Get('/admin/error/list/10');
}

export function fetchFantasyConfigData() {
  return Get('/admin/config/list');
}
