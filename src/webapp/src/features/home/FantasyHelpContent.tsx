import React from 'react';
import './Home.styles.scss';
import {Badge, Col, Row} from 'react-bootstrap';

const FantasyHelpContent = () => {
  function renderFantasyDefinition() {
    return (
      <div>
        <Row className="headerRow">
          <Col>
            <h3>
              <Badge variant="light">
                What Is Tournament Fantasy Cricket?{' '}
              </Badge>
            </h3>
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={8}>
            Tournament Fantasy cricket is an online fantasy game, in which a
            user makes a virtual cricket team of eleven players from tournament
            Playing Playing teams.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={8}>
            Points are then scored depending on how the selected cricketers
            perform in the games happening. To win the League leagues, the users
            must strive to earn maximum points and get the highest points in the
            leaderboard.
          </Col>{' '}
        </Row>
        <Row className="contentRow">
          <Col md={8}>
            The main aim is to ultimately Play friendly Fantasy Cricket With
            your friend, thoughout the tournament with single team by managing
            transfer properly!
          </Col>
        </Row>
      </div>
    );
  }

  function renderFantasyRules() {
    return (
      <div>
        <Row className="headerRow">
          <Col>
            <h3>
              <Badge variant="light">
                Rules for Tournament Fantasy Cricket?{' '}
              </Badge>
            </h3>
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={1}>
            <Badge variant="light">Budget</Badge>
          </Col>
          <Col md={8}>
            Fantasy Team will have an budget cap, and the players need to be
            selected within the total credits that have been assigned
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={1}>
            <Badge variant="light">Transfer</Badge>
          </Col>
          <Col md={8}>
            Fantasy Team will have an Total Transfer cap for Tournament, User
            will get limited number of Transfer, which User should Use while
            playing Fantasy in Tournament
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={1}>
            <Badge variant="light">Player Selection Rules</Badge>
          </Col>
          <Col md={8}>
            Fantasy Team will have an Certain Rules for selecting PLayers. User
            have to follow them. like, for Cricket team, User can select a
            minimum of 1 wicket-keeper and a maximum of four keepers, minimum
            three batters with a maximum of six. You need to select at least one
            all-rounder, and the number can go up to four, while you need a
            minimum of three bowlers and a maximum of six. A maximum of six
            players from one side can be picked.
          </Col>
        </Row>
      </div>
    );
  }

  function renderHowToPlay() {
    return (
      <div>
        <Row className="headerRow">
          <Col>
            <h3>
              <Badge variant="light">How To Play? </Badge>
            </h3>
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={1}>
            <Badge variant="light">Create Team</Badge>
          </Col>
          <Col md={8}>
            To Play Fantasy Team will need Team First, Please Create Team by
            following rules
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={1}>
            <Badge variant="light">Create/Join League</Badge>
          </Col>
          <Col md={8}>
            Create league and Share code with Friends, Ask friends to join
            League. OR Join league create by Friends
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={1}>
            <Badge variant="light">Make Transfer</Badge>
          </Col>
          <Col md={8}>
            Once you create Team and joined League, Manage team as per match
            schedule, make Transfer before match starts.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={1}>
            <Badge variant="light">Check League Ranking</Badge>
          </Col>
          <Col md={8}>
            After Match Finish, Your score will get Updated and your ranking in
            League also. Please check your leagues and league Ranking.
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div>
      {renderFantasyDefinition()}
      {renderFantasyRules()}
      {renderHowToPlay()}
    </div>
  );
};

export default FantasyHelpContent;
