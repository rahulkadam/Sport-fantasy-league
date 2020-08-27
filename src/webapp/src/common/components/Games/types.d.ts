declare type GameCardProps = {
  team_host_name: string;
  team_away_name: string;
  team1logo?: string;
  team2logo?: string;
  matchTime?: any;
  venue_name?: string;
  tournament_name?: string;
  id: any;
  status?: any;
};

declare type PlayerScoreCardProps = {
  name: string;
  team: string;
  score?: number;
  matches?: number;
  rank?: number;
  runs?: number;
  wickets?: number;
  catches?: number;
  id: any;
};

declare type LeagueCardProps = {
  data: any;
  userteam?: any;
};

declare type UserTeamCardProps = {
  data: any;
};

declare type GameCorouselProps = {
  matchScheduleCard?: GameCardProps[];
  mostScoringPlayerList?: PlayerScoreCardProps[];
  leagueList?: any[];
  type: string;
  data?: any;
};
