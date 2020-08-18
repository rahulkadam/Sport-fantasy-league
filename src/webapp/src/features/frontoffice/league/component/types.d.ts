declare type LeagueUserListProps = {
  userleagueList: any;
  fetchTeamListByUser?: any;
  playerList?: any;
};

declare type JoinLeagueProps = {
  data: any;
  userid: number;
};

declare type CreateLeagueProps = {
  data?: any;
  createLeague: any;
  tournamentList: any[];
  userId?: number;
};

declare type LeagueMemberTeamDetailsProps = {
  handleClose?: any;
  handleShow?: any;
  playerList?: any;
  show?: boolean;
  data?: data;
};
