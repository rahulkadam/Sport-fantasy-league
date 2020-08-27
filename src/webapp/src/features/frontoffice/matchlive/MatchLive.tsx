import React, {useEffect, useState} from 'react';
import './MatchLive.styles.scss';
import MatchStats from './components/MatchStats';
import LoadingOverlay from 'react-loading-overlay';
import {fetchLiveMatchListAction, getLiveMatchProps} from './redux';
import {Button, Form} from 'react-bootstrap';
import {StatusMessage} from 'common/components';
import {getCommonData} from '../../common/redux';
import {fetchMatchStatsListAction, getStatsProps} from '../stats/redux';

const MatchLive = () => {
  const liveMatchProps = getLiveMatchProps();
  const statsProps = getStatsProps();
  const configProps = getCommonData();
  const fetchLiveMatchlist = fetchLiveMatchListAction();
  const fetchMatchStats = fetchMatchStatsListAction();

  useEffect(() => {
    fetchLiveMatchlist();
  }, []);

  const defaultTabKey = 'matchstats';
  const [tabName, setTabName] = useState(defaultTabKey);

  function renderMatchStats() {
    return (
      <div>
        <StatusMessage
          type="info"
          text="Select below match to see Player scoring history From Live Match"
        />
        <MatchStats
          data={liveMatchProps.livematches}
          action={fetchMatchStats}
          playerStats={statsProps.playerStats}
          title="Match Player Stats"
        />
      </div>
    );
  }

  const tabConfig: TabConfig[] = [
    {
      key: 'matchstats',
      title: 'Match Stats',
      renderfunction: renderMatchStats(),
    },
  ];

  function renderStatsComponent() {
    let component: any = <div></div>;
    component = tabConfig.find(tab => {
      return tab.key == tabName;
    });
    return component.renderfunction || <div></div>;
  }

  function renderStatsActions() {
    return (
      <Form inline className="statsAction">
        <Button
          variant={tabName == 'matchstats' ? 'primary' : 'outline-primary'}
          className="mr-2"
          onClick={() => setTabName('matchstats')}>
          Live Match
        </Button>
      </Form>
    );
  }

  return (
    <div className="statsContainer">
      <LoadingOverlay
        active={configProps.isLoading}
        spinner
        text="Loading Stats Details ...">
        {renderStatsActions()}
        {renderStatsComponent()}
      </LoadingOverlay>
    </div>
  );
};

export default MatchLive;
