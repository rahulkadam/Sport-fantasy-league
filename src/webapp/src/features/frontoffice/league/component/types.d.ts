declare type LeagueUserListProps = {
  userleagueList: any;
  fetchTeamListByUser?: any;
  playerList?: any;
  captainId?: any;
};

declare type JoinLeagueProps = {
  data: any;
  userid?: number;
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
  captainId?: any;
  show?: boolean;
  data?: data;
};

declare type JoinLeagueModalProps = {
  joinLeague?: any;
  show: boolean;
  handleClose?: any;
  handleShow?: any;
};
