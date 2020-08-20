declare type UserTeamListProps = {
  data: any;
};

declare type TeamDetailsProps = {
  data: any;
};

declare type CreateTeamProps = {
  createTeamAction: any;
  userProps: User;
};

declare type UserTeamPlayerDetails = {
  data: any;
  title?: string;
  onRowSelected?: any;
  onRemoveRowAction?: any;
  rowDisabledCriteria?: any;
  currentUserTeamPlayers?: any;
  captionId?: any;
  updateCaptionAction?: any;
  editable?: boolean;
};

declare type PlayerTypeCountSummaryProps = {
  playerList: any;
};
