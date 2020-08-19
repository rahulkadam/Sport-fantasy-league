declare type League = {
  data: any;
  isLoading: boolean;
  hasError: boolean;
  statusMessage: string;
  tabName?: string;
  shouldRefresh?: boolean;
  leagueMemberTeam?: any;
};

declare type CreateLeagueRequestObj = {
  name: string;
  tournamentId: string;
  createByUserId: string;
};
