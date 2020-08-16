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

declare type GameCorouselProps = {
  matchScheduleCard?: GameCardProps[];
  type: string;
};
