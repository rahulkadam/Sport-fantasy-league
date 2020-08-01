import React, {useEffect} from 'react';
import {StatusMessage, TabContainer} from 'common/components';
import {VenueDetails, CreateVenue} from './component';
import {fetchVenueListAction, createVenueAction, getVenueData} from './redux';

const Venue = () => {
  const dataProps = getVenueData();
  const fetchPlayerList = fetchVenueListAction();
  const createPlayer = createVenueAction();
  const tabName = 'venueoverview';

  useEffect(() => {
    console.log('component will Mount only once, render everytime');
    fetchPlayerList();
  }, []);
  useEffect(() => {
    console.log('component will Mount, render everytime');
  });
  function createVenueFromAdmin(name: string, country: string, city: string) {
    createPlayer(name, country, city);
  }

  function renderVenue() {
    return <CreateVenue createVenueAction={createVenueFromAdmin} />;
  }

  function renderVenueListView() {
    return (
      <div>
        <VenueDetails title="Player List" data={dataProps.venueList} />
      </div>
    );
  }

  const tabConfig: TabConfig[] = [
    {
      key: 'venueoverview',
      title: 'Overview',
      renderfunction: renderVenueListView(),
    },
    {
      key: 'createvenue',
      title: 'Create Venue',
      renderfunction: renderVenue(),
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

export {Venue};
