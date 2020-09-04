declare type League = {
  data: any;
  tabName?: string;
  shouldRefresh?: boolean;
  leagueMemberTeam?: any;
};

declare type CreateLeagueRequestObj = {
  name: string;
  tournamentId?: string;
  createByUserId?: string;
};
