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
};

declare type UploadMatchResultProps = {
  uploadMatchResultAction: any;
  data: any;
  matchList: any;
  teamList: any;
  playerList: any;
  tournamentList?: any;
};

declare type UploadMatchPointProps = {
  uploadMatchResultAction: any;
  data: any;
  matchList: any;
  teamList: any;
  playerList: any;
  tournamentList?: any;
};
