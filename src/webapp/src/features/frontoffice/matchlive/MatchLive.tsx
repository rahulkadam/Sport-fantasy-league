import React, {useEffect} from 'react';
import './MatchLive.styles.scss';
import LoadingOverlay from 'react-loading-overlay';
import {fetchPlayerScoreByLiveMatchesAction, getLiveMatchProps} from './redux';
import {Button, Row, Col, Badge} from 'react-bootstrap';
import {Logo, StatusMessage} from 'common/components';
import {getCommonData} from '../../common/redux';
import {isListEmpty} from 'common/util';
import Helmet from 'react-helmet';
import PlayerMatchScoreStats from './components/PlayerMatchScoreStats';
import {
  TWITTER_LIST_SCORE,
  TwitterFantasyTimeline,
} from 'common/components/Footer/socialmedia';
import {GA_Other_Event} from 'common/config';
import {
  getLogoNameByTeam,
  getShortNameByTeam,
} from 'common/components/FantasyDropDown';

const MatchLive = () => {
  const liveMatchProps = getLiveMatchProps();
  const configProps = getCommonData();
  const fetchPlayerLiveScore = fetchPlayerScoreByLiveMatchesAction();
  const playerStats = liveMatchProps.playerStats || [];
  const matchScore = liveMatchProps.matchScore || {};
  const isMatchPresent = matchScore.id;

  useEffect(() => {
    GA_Other_Event('GET_LIVE_SCORE');
    fetchPlayerLiveScore();
  }, []);

  function renderMatchScore() {
    let team1score = matchScore.team_host_name_score || '';
    team1score = team1score.split(':');
    let team2score = matchScore.team_away_name_score || '';
    team2score = team2score.split(':');
    const hometeam = team1score[0] || matchScore.team_host_name;
    const awayteam = team2score[0] || matchScore.team_away_name;

    return (
      <div className="ownedPlayer">
        <Row className="nameColumn">
          <Col>{matchScore.description || matchScore.state}</Col>
        </Row>
        <Row className="nameColumn">
          <Col>
            <Logo logoSource={getLogoNameByTeam(hometeam)} width="20" />
            {getShortNameByTeam(hometeam) || hometeam}
          </Col>
          <Col>{team1score[1] || '-'}</Col>
        </Row>
        <Row className="nameColumn">
          <Col>
            <Logo logoSource={getLogoNameByTeam(awayteam)} width="20" />
            {getShortNameByTeam(awayteam) || awayteam}
          </Col>
          <Col>{team2score[1] || '-'}</Col>
        </Row>
        <Row className="nameColumn">
          <Col>
            <Badge variant="info">
              {' '}
              {matchScore.matchResult || matchScore.state}
            </Badge>
          </Col>
        </Row>
      </div>
    );
  }

  function renderPlayerLiveScore() {
    return (
      <div>
        <div className="liveMatchTitle">Live Match Points</div>
        <Row>
          <Col md={4}>
            <Button
              variant="outline-success"
              className="mr-2 "
              onClick={() => {
                GA_Other_Event('REFRESH_SCORE_FOR_LIVE');
                fetchPlayerLiveScore();
              }}>
              Refresh Score
            </Button>
          </Col>
          <Col>
            <Badge variant="warning">
              Keep checking Live Points every 5 Min
            </Badge>{' '}
          </Col>
        </Row>
        {!isMatchPresent && (
          <StatusMessage
            type="error"
            text="No IPL Live Match. Please check during live IPL match"
          />
        )}
        {isMatchPresent && renderMatchScore()}
        {!isListEmpty(playerStats) && (
          <PlayerMatchScoreStats data={playerStats} type="live" />
        )}
      </div>
    );
  }

  function renderTwitterHashtag() {
    return <TwitterFantasyTimeline type="list" id={TWITTER_LIST_SCORE} />;
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
