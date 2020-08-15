import React, {useEffect} from 'react';
import {StatusMessage, TabContainer} from 'common/components';
import {SportTeamDetails, CreateSportTeam} from './component';
import {
  fetchTeamListAction,
  createTeamAction,
  getTeamData,
  addTournamentToTeamAction,
} from './redux';
import {
  fetchTournamentListAction,
  getTournamentData,
} from '../Tournament/redux';
import {UpdateTeam} from './component/UpdateTeam';

const SportTeam = () => {
  const tournamentData = getTournamentData();
  const dataProps = getTeamData();
  const fetchTeamList = fetchTeamListAction();
  const fetchTournamentList = fetchTournamentListAction();
  const addTournamentToTeam = addTournamentToTeamAction();
  const createTournamentTeam = createTeamAction();
  const tabName = 'teamoverview';

  useEffect(() => {
    fetchTeamList();
  }, []);
  function createTeam(name: string, country: string, sport: string) {
    createTournamentTeam(name, country, sport);
  }

  /*
  function addTournamentToTeam(teamId: number, tournamentId: number) {
    console.log('id ', tournamentId);
    addTournamentToTeamAction(teamId, tournamentId);
  }
  */

  function renderCreateTeam() {
    return <CreateSportTeam createTeamAction={createTeam} />;
  }

  function renderTeamListView() {
    return (
      <div>
        <SportTeamDetails title="Team List" data={dataProps.teamList} />
      </div>
    );
  }

  function loadTournamentList() {
    fetchTournamentList();
  }

  function renderUpdateTeam() {
    return (
      <UpdateTeam
        teamList={dataProps.teamList}
        tournamentList={tournamentData.tournamentList}
        addTournamentToTeamAction={addTournamentToTeam}
        loadTournamentList={loadTournamentList}
      />
    );
  }

  const tabConfig: TabConfig[] = [
    {
      key: 'teamoverview',
      title: 'Overview',
      renderfunction: renderTeamListView(),
    },
    {
      key: 'createTeam',
      title: 'Create Team',
      renderfunction: renderCreateTeam(),
    },
    {
      key: 'updateteam',
      title: 'Update Team',
      renderfunction: renderUpdateTeam(),
    },
  ];
  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = dataProps.hasError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }
  return (
    <div>
      {renderStatusMessage(dataProps.hasError, dataProps.statusMessage)}
      <TabContainer defaultKey={tabName} tabConfig={tabConfig} />
    </div>
  );
};

export default SportTeam;
