import React, {useEffect} from 'react';
import {StatusMessage, TabContainer} from 'common/components';
import {VenueDetails, CreateVenue, TopUserTeamList} from './component';
import {
  fetchVenueListAction,
  createVenueAction,
  getVenueData,
  fetchTop30UserListAction,
} from './redux';
import './venue.styles.scss';

const Venue = () => {
  const dataProps = getVenueData();
  const fetchVenueList = fetchVenueListAction();
  const createPlayer = createVenueAction();
  const fetchTop30User = fetchTop30UserListAction();
  const tabName = 'venueoverview';
  const userList = dataProps.userList;

  useEffect(() => {
    fetchVenueList();
    fetchTop30User();
  }, []);
  function createVenueFromAdmin(name: string, country: string, city: string) {
    createPlayer(name, country, city);
  }

  function renderVenue() {
    return <CreateVenue createVenueAction={createVenueFromAdmin} />;
  }

  function renderVenueListView() {
    return (
      <div>
        <VenueDetails title="Venue List" data={dataProps.venueList} />
      </div>
    );
  }

  function renderTopUserListView() {
    return (
      <div>
        <TopUserTeamList userList={userList} />
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
    {
      key: 'userList',
      title: 'User List',
      renderfunction: renderTopUserListView(),
    },
  ];
  function renderStatusMessage(isError: boolean, statusMessage: string) {
    const statusClassName = dataProps.hasError ? 'error' : 'success';
    return <StatusMessage text={statusMessage} type={statusClassName} />;
  }
  return (
    <div className="venueContainer">
      {renderStatusMessage(dataProps.hasError, dataProps.statusMessage)}
      <TabContainer defaultKey={tabName} tabConfig={tabConfig} />
    </div>
  );
};

export default Venue;
