import React, {useEffect} from 'react';
import {StatusMessage, TabContainer} from 'common/components';
import {SportTeamDetails, CreateSportTeam} from './component';
import {fetchTeamListAction, createTeamAction, getTeamData} from './redux';

const SportTeam = () => {
  const dataProps = getTeamData();
  const fetchTournamentList = fetchTeamListAction();
  const createTournamentTeam = createTeamAction();
  const tabName = 'teamoverview';

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchTournamentList();
  }, []);
  useEffect(() => {
    console.log('component will Mount, render everytime');
  });
  function createTeam(name: string, country: string, sport: string) {
    console.log('creating team :', name);
    createTournamentTeam(name, country, sport);
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
  ];
  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = dataProps.hasError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }
  return (
    <div>
      Welcome to Team List with
      {renderStatusMessage(dataProps.hasError, dataProps.statusMessage)}
      <TabContainer defaultKey={tabName} tabConfig={tabConfig} />
    </div>
  );
};

export {SportTeam};
