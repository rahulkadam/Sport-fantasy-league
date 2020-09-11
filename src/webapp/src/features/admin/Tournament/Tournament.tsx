import React, {useEffect} from 'react';
import {StatusMessage, TabContainer} from 'common/components';
import {
  TournamentDetails,
  CreateTournament,
  FantasyErrorList,
  FantasyConfigList,
} from './component';
import {
  fetchTournamentListAction,
  createTournamentAction,
  getTournamentData,
  fetchTopErrorListAction,
  fetchFantasyConfigDataAction,
} from './redux';
import './Tournament.styles.scss';

const Tournament = () => {
  const dataProps = getTournamentData();
  const fetchTournamentList = fetchTournamentListAction();
  const fetchError = fetchTopErrorListAction();
  const fetchConfig = fetchFantasyConfigDataAction();
  const createTournamentTeam = createTournamentAction();
  const tabName = 'tournamentoverview';

  useEffect(() => {
    fetchTournamentList();
    fetchError();
    fetchConfig();
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

  function renderErrorList() {
    return <FantasyErrorList errorList={dataProps.errorList} />;
  }

  function renderConfigList() {
    return <FantasyConfigList list={dataProps.configList} />;
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
    {
      key: 'errorList',
      title: 'View Errors',
      renderfunction: renderErrorList(),
    },
    {
      key: 'configList',
      title: 'View Config',
      renderfunction: renderConfigList(),
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
