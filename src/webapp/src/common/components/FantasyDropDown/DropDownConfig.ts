import {
  teamCSK,
  teamDC,
  teamKKR,
  teammumbai,
  teampunjab,
  teamrajsthan,
  teamRCB,
  teamSRH,
} from '@logos/index';

export const countryList = [
  {id: 'INDIA', name: 'INDIA'},
  {id: 'AUSTRALIA', name: 'AUSTRALIA'},
  {id: 'NEW ZEALAND', name: 'NEW ZEALAND'},
  {id: 'ENGLAND', name: 'ENGLAND'},
  {id: 'SRILANKA', name: 'SRILANKA'},
  {id: 'AFGANISTAN', name: 'AFGANISTAN'},
  {id: 'SOUTH AFRICA', name: 'SOUTH AFRICA'},
  {id: 'WEST INDIES', name: 'WEST INDIES'},
  {id: 'BANGLADESH', name: 'BANGLADESH'},
  {id: 'NEPAL', name: 'NEPAL'},
];

export const countryListWithAll = [{id: 'ALL', name: 'ALL'}].concat(
  countryList
);

export const PlayerTypeList = [
  {id: 'BATSMAN', name: 'BATSMAN', shortName: 'BAT', badge: 'danger'},
  {id: 'BOWLER', name: 'BOWLER', shortName: 'BOWL', badge: 'success'},
  {id: 'WICKETKEEPER', name: 'WICKETKEEPER', shortName: 'WK', badge: 'primary'},
  {id: 'ALLROUNDER', name: 'ALLROUNDER', shortName: 'AR', badge: 'warning'},
];

export const PlayerTypeListWithALl = [{id: 'ALL', name: 'ALL'}].concat(
  PlayerTypeList
);

export const sportList = [
  {id: 'CRICKET', name: 'CRICKET'},
  {id: 'FOOTBALL', name: 'FOOTBALL'},
];

export const teamList = [
  {id: 'Mumbai Indians', name: 'Mumbai Indians', logo: teammumbai, short: 'MI'},
  {
    id: 'Chennai Super Kings',
    name: 'Chennai Super Kings',
    logo: teamCSK,
    short: 'CSK',
  },
  {
    id: 'Royal Challengers Bengaluru',
    name: 'Royal Challengers Bengaluru',
    logo: teamRCB,
    short: 'RCB',
  },
  {id: 'Delhi Capitals', name: 'Delhi Capitals', logo: teamDC, short: 'DC'},
  {
    id: 'Kings XI Punjab',
    name: 'Kings XI Punjab',
    logo: teampunjab,
    short: 'KXIP',
  },
  {
    id: 'Kolkata Knight Riders',
    name: 'Kolkata Knight Riders',
    logo: teamKKR,
    short: 'KKR',
  },
  {
    id: 'Rajasthan Royals',
    name: 'Rajasthan Royals',
    logo: teamrajsthan,
    short: 'RR',
  },
  {
    id: 'Sunrisers Hyderabad',
    name: 'Sunrisers Hyderabad',
    logo: teamSRH,
    short: 'SRH',
  },
];

export function getLogoNameByTeam(team: string) {
  const map = new Map();
  teamList.forEach(team => {
    map.set(team.name, team.logo);
  });
  return map.get(team);
}

export function getShortNameByTeam(team: string) {
  const map = new Map();
  teamList.forEach(team => {
    map.set(team.name, team.short);
  });
  return map.get(team);
}

export function getLogoNameByLeagueName(league: string) {
  const map = new Map();
  teamList.forEach(team => {
    if (league.includes(team.short)) {
      map.set(league, team.logo);
    }
  });
  return map.get(league);
}

export const teamListWithALl = [{id: 'ALL', name: 'ALL'}].concat(teamList);
