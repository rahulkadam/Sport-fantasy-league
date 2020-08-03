import React, {useEffect} from 'react';
import {StatusMessage, TabContainer} from 'common/components';
import {
  MatchDetails,
  CreateMatch,
  UploadMatchResult,
  UploadMatchPoint,
} from './component';
import {
  fetchMatchListAction,
  createMatchAction,
  getMatchData,
  uploadMatchPlayerPointAction,
  uploadMatchResultAction,
} from './redux';
import {fetchTeamListAction, getTeamData} from '../SportTeam/redux';
import {fetchPlayerListAction, getPlayerData} from '../player/redux';
import {
  fetchTournamentListAction,
  getTournamentData,
} from '../Tournament/redux';

const Match = () => {
  const matchProps = getMatchData();
  const playerProps = getPlayerData();
  const teamProps = getTeamData();
  const fetchMatchList = fetchMatchListAction();
  const fetchTeamList = fetchTeamListAction();
  const fetchPlayerList = fetchPlayerListAction();
  const fetchTournamentList = fetchTournamentListAction();
  const tournamentProps = getTournamentData();
  const createMatch = createMatchAction();
  const uploadMatchPlayerPoint = uploadMatchPlayerPointAction();
  const uploadMatchResult = uploadMatchResultAction();
  const tabName = 'matchoverview';

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchMatchList();
  }, []);
  useEffect(() => {
    console.log('component will Mount, render everytime');
  });
  function createMatchFromAdmin(requestObject: CreateMatchRequestObject) {
    createMatch(requestObject);
  }

  function renderCreateMatch() {
    return (
      <CreateMatch
        createMatchAction={createMatchFromAdmin}
        teamList={teamProps.teamList}
        tournamentList={tournamentProps.tournamentList}
      />
    );
  }

  function renderMatchListView() {
    return (
      <div>
        <MatchDetails title="Match List" data={matchProps.matchList} />
      </div>
    );
  }

  function renderUploadMatchResult() {
    return (
      <UploadMatchResult
        uploadMatchResultAction={uploadMatchResult}
        data={matchProps}
        matchList={matchProps.matchList}
        teamList={teamProps.teamList}
        playerList={playerProps.playerList}
        tournamentList={tournamentProps.tournamentList}
        loadTeamList={fetchTeamList}
        loadPlayerList={fetchPlayerList}
        loadTournamentList={fetchTournamentList}
      />
    );
  }

  function renderUploadMatchPoint() {
    return (
      <UploadMatchPoint
        uploadMatchResultAction={uploadMatchPlayerPoint}
        data={matchProps}
        matchList={matchProps.matchList}
        teamList={teamProps.teamList}
        playerList={playerProps.playerList}
        loadTeamList={fetchTeamList}
        loadMatchList={fetchMatchList}
        loadPlayerList={fetchPlayerList}
      />
    );
  }

  const tabConfig: TabConfig[] = [
    {
      key: 'matchoverview',
      title: 'Overview',
      renderfunction: renderMatchListView(),
    },
    {
      key: 'createMatch',
      title: 'Create Match',
      renderfunction: renderCreateMatch(),
    },
    {
      key: 'uploadmatchResult',
      title: 'Upload Match Result',
      renderfunction: renderUploadMatchResult(),
    },
    {
      key: 'uploadmatchPoint',
      title: 'Upload Match Point',
      renderfunction: renderUploadMatchPoint(),
    },
  ];
  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = matchProps.hasError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }
  return (
    <div>
      {renderStatusMessage(matchProps.hasError, matchProps.statusMessage)}
      <TabContainer defaultKey={tabName} tabConfig={tabConfig} />
    </div>
  );
};

export {Match};
