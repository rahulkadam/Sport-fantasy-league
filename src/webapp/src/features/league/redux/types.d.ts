declare type League = {
  data: any;
  isLoading: boolean;
  hasError: boolean;
  statusMessage: string;
};

declare type CreateLeagueRequestObj = {
  name: string;
  tournamentId: string;
  createByUserId: string;
};
