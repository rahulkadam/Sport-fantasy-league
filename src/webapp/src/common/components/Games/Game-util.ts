import {teammumbai, teampunjab, teamrajsthan} from '@logos/index';

export function getTeamLogoByName(name: string) {
  switch (name) {
    case 'Mumbai Indians':
      return teammumbai;
    case 'Chennai Super Kings':
      return teamrajsthan;
    case 'PNJ':
      return teampunjab;
  }
}
