import React, {useEffect, useState} from 'react';
import './MatchLive.styles.scss';
import LoadingOverlay from 'react-loading-overlay';
import {fetchPlayerScoreByLiveMatchesAction, getLiveMatchProps} from './redux';
import {Button, Form} from 'react-bootstrap';
import {StatusMessage} from 'common/components';
import {getCommonData} from '../../common/redux';
import {isListEmpty} from 'common/util';
import TwitterFantasyTimeline from 'common/components/Footer/socialmedia/TwitterFantasyTimeline';
import Helmet from 'react-helmet';
import PlayerMatchScoreStats from './components/PlayerMatchScoreStats';

const MatchLive = () => {
  const liveMatchProps = getLiveMatchProps();
  const configProps = getCommonData();
  const fetchPlayerLiveScore = fetchPlayerScoreByLiveMatchesAction();
  const playerStats = liveMatchProps.playerStats || [];

  useEffect(() => {
    fetchPlayerLiveScore();
  }, []);

  function renderPlayerLiveScore() {
    return (
      <div>
        Live Match Stats:
        {isListEmpty(playerStats) && (
          <StatusMessage
            type="error"
            text="IPL live matches not present. Please check after some time"
          />
        )}
        {!isListEmpty(playerStats) && (
          <PlayerMatchScoreStats data={playerStats} />
        )}
      </div>
    );
  }

  function renderTwitterHashtag() {
    return <TwitterFantasyTimeline type="list" id="1301204455279398912" />;
  }

  return (
    <div className="statsContainer">
      <LoadingOverlay
        active={configProps.isLoading}
        spinner
        text="Loading Stats Details ...">
        <Helmet>
          <title>Live Match Points</title>
        </Helmet>
        {renderPlayerLiveScore()}
        {renderTwitterHashtag()}
      </LoadingOverlay>
    </div>
  );
};

export default MatchLive;
