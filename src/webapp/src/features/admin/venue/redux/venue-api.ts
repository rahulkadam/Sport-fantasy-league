import {Get, Post} from 'API';

export function createVenue(name: string, country: string, city: string) {
  return Post('/fantasy/venue/create', {
    data: {name: name, country: country, city: city},
  });
}

export function fetchAllVenueList() {
  return Get('/fantasy/venue/list');
}

export function fetchTop30UserList() {
  return Post('/fantasy/userteam/get/top/30');
}
