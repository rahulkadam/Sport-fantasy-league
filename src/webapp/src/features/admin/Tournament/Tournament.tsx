import React, {useEffect} from 'react';
import {StatusMessage, TabContainer} from 'common/components';
import {TournamentDetails, CreateTournament} from './component';
import {
  fetchTournamentListAction,
  createTournamentAction,
  getTournamentData,
} from './redux';

const Tournament = () => {
  const dataProps = getTournamentData();
  const fetchTournamentList = fetchTournamentListAction();
  const createTournamentTeam = createTournamentAction();
  const tabName = 'tournamentoverview';

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchTournamentList();
  }, []);
  useEffect(() => {
    console.log('component will Mount, render everytime');
  });
  function createTournament(name: string, country: string, sport: string) {
    console.log('creating team :', name);
    createTournamentTeam(name, country, sport);
  }

  function renderCreateTournament() {
    return <CreateTournament createTournamentAction={createTournament} />;
  }

  function renderTournamentListView() {
    return (
      <div>
        <TournamentDetails
          title="Your Selected Fantasy Team"
          data={dataProps.tournamentList}
        />
      </div>
    );
  }

  const tabConfig: TabConfig[] = [
    {
      key: 'tournamentoverview',
      title: 'Overview',
      renderfunction: renderTournamentListView(),
    },
    {
      key: 'createTournament',
      title: 'Create Tournament',
      renderfunction: renderCreateTournament(),
    },
  ];
  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = dataProps.hasError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }
  return (
    <div>
      Welcome to Tournament Team List with
      {renderStatusMessage(dataProps.hasError, dataProps.statusMessage)}
      <TabContainer defaultKey={tabName} tabConfig={tabConfig} />
    </div>
  );
};

export {Tournament};
