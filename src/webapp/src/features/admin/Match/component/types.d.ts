declare type CreateMatchProps = {
  createMatchAction: any;
  tournamentList?: any;
  venueList?: any;
  teamList?: any;
};

declare type MatchDetailsProps = {
  matchList?: any;
  data: any;
  title: string;
  onRowSelected?: any;
  playerStats?: any;
  fetchMatchHistory?: any;
};

declare type UploadMatchResultProps = {
  uploadMatchResultAction: any;
  data: any;
  matchList: any;
  teamList: any;
  playerList: any;
  tournamentList?: any;
  loadTournamentList?: any;
  loadPlayerList?: any;
  loadTeamList?: any;
};

declare type UploadMatchPointProps = {
  uploadMatchResultAction: any;
  data: any;
  matchList: any;
  teamList: any;
  playerList: any;
  tournamentList?: any;
  loadPlayerList?: any;
  loadMatchList?: any;
  loadTeamList?: any;
};

declare type CreateMatchRequestObject = {
  description: string;
  homeTeamId: number;
  awayTeamId: number;
  tournamentId: number;
  venueId: number;
  isoMatchTime: string;
};

declare type PlayerMatchPointRequestObject = {
  matchId: number;
  playerId: number;
  points: number;
  runs: number;
  wickets: number;
  catches: number;
};

declare type MatchResultObject = {
  description: string;
  team_winner_id: number;
  matchId: number;
  matchPlayerId: number;
};
