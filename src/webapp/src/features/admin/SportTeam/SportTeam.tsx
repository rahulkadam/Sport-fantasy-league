import React, {useEffect} from 'react';
import {StatusMessage, TabContainer} from 'common/components';
import {SportTeamDetails, CreateSportTeam} from './component';
import {fetchTeamListAction, createTeamAction, getTeamData} from './redux';
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
  const createTournamentTeam = createTeamAction();
  const tabName = 'teamoverview';

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchTeamList();
  }, []);
  useEffect(() => {
    console.log('component will Mount, render everytime');
  });
  function createTeam(name: string, country: string, sport: string) {
    console.log('creating team :', name);
    createTournamentTeam(name, country, sport);
  }

  function addTournamentToTeamAction(teamId: number, tournamentId: number) {
    console.log('id ', teamId);
  }

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
    if (tournamentData.tournamentList.length == 0) {
      console.log('loading tournament', tournamentData.tournamentList.length);
      // fetchTournamentList();
    }
    return (
      <UpdateTeam
        teamList={dataProps.teamList}
        tournamentList={tournamentData.tournamentList}
        addTournamentToTeamAction={addTournamentToTeamAction}
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

export {SportTeam};
