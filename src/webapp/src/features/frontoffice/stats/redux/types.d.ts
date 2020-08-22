declare type FantasyStats = {
  data: any;
  isLoading: boolean;
  hasError: boolean;
  statusMessage: string;
  tabName?: string;
  shouldRefresh?: boolean;
  playerStats?: any;
  matchStats?: any;
  userStats?: any;
  playerMatchScoreList?: any;
};
