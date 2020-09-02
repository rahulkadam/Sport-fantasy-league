import React, {useEffect, useState} from 'react';
import './MatchLive.styles.scss';
import MatchStats from './components/MatchStats';
import LoadingOverlay from 'react-loading-overlay';
import {fetchLiveMatchListAction, getLiveMatchProps} from './redux';
import {Button, Form} from 'react-bootstrap';
import {StatusMessage} from 'common/components';
import {getCommonData} from '../../common/redux';
import {fetchMatchStatsListAction, getStatsProps} from '../stats/redux';
import {isListEmpty} from '../../../common/util';
import TwitterHashtag from '../../../common/components/Footer/socialmedia/TwitterHashtag';

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
    const isLiveMatchEmpty = isListEmpty(liveMatchProps.livematches);
    return (
      <div>
        {!isLiveMatchEmpty && (
          <StatusMessage
            type="info"
            text="Select below match to see Player scoring history From Live Match"
          />
        )}
        <MatchStats
          data={liveMatchProps.livematches}
          action={fetchMatchStats}
          playerStats={statsProps.playerStats}
          title="Match Player Stats"
        />

        {isLiveMatchEmpty && (
          <StatusMessage
            type="error"
            text="IPL live matches not present. Please check after some time"
          />
        )}
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
          variant={tabName == 'matchstats' ? 'info' : 'outline-info'}
          className="mr-2"
          onClick={() => setTabName('matchstats')}>
          Live Match
        </Button>
      </Form>
    );
  }

  function renderTwitterHashtag() {
    return <TwitterHashtag type="list" id="1301204455279398912" />;
  }

  return (
    <div className="statsContainer">
      <LoadingOverlay
        active={configProps.isLoading}
        spinner
        text="Loading Stats Details ...">
        {renderStatsActions()}
        {renderStatsComponent()}
        {renderTwitterHashtag()}
      </LoadingOverlay>
    </div>
  );
};

export default MatchLive;
