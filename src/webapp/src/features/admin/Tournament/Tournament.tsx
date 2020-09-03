import React, {useEffect} from 'react';
import {StatusMessage, TabContainer} from 'common/components';
import {TournamentDetails, CreateTournament} from './component';
import {
  fetchTournamentListAction,
  createTournamentAction,
  getTournamentData,
} from './redux';
import './Tournament.styles.scss';

const Tournament = () => {
  const dataProps = getTournamentData();
  const fetchTournamentList = fetchTournamentListAction();
  const createTournamentTeam = createTournamentAction();
  const tabName = 'tournamentoverview';

  useEffect(() => {
    fetchTournamentList();
  }, []);
  function createTournament(name: string, country: string, sport: string) {
    createTournamentTeam(name, country, sport);
  }

  function renderCreateTournament() {
    return <CreateTournament createTournamentAction={createTournament} />;
  }

  function renderTournamentListView() {
    return (
      <div>
        <TournamentDetails
          title="Tournament List"
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
    <div className="tournamentContainer">
      {renderStatusMessage(dataProps.hasError, dataProps.statusMessage)}
      <TabContainer defaultKey={tabName} tabConfig={tabConfig} />
    </div>
  );
};

export default Tournament;
