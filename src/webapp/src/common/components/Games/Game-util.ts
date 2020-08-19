import {
  teamCSK,
  teamDC,
  teammumbai,
  teampunjab,
  teamrajsthan,
} from '@logos/index';

export function getTeamLogoByName(name: string) {
  switch (name) {
    case 'Mumbai Indians':
      return teammumbai;
    case 'Chennai Super Kings':
      return teamCSK;
    case 'Delhi Capitals':
      return teamDC;
    case 'PNJ':
      return teampunjab;
  }
}
