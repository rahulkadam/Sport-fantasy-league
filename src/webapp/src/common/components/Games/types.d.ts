declare type GameCardProps = {
  team1: string;
  team2: string;
  team1logo: string;
  team2logo: string;
  time?: any;
  venue?: string;
  tournament?: string;
  id: any;
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

declare type GameCorouselProps = {
  matchScheduleCard?: GameCardProps[];
  mostScoringPlayerList?: PlayerScoreCardProps[];
  type: string;
};
