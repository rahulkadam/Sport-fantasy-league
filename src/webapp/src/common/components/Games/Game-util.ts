import {teammumbai, teampunjab, teamrajsthan} from '@logos/index';

export function getTeamLogoByName(name: string) {
  switch (name) {
    case 'MI':
      return teammumbai;
    case 'CSK':
      return teamrajsthan;
    case 'PNJ':
      return teampunjab;
  }
}
