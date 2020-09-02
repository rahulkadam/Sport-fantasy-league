import React from 'react';
import '../Home.styles.scss';
import {Badge, Col, Row, Accordion, Card, Button} from 'react-bootstrap';
import HowToPlay from './HowToPlay';
import IPLPointSystems from '../../../../common/components/HelpPage/points/IPLPointSystems';

const FantasyHelpContent = () => {
  function renderFantasyDefinition() {
    return (
      <div>
        <Row className="headerRow">
          <Col>
            <h3>
              <Badge variant="light">What is Fantasy Cricket? </Badge>
            </h3>
          </Col>
        </Row>
        <Row className="contentRow">
          <Col>
            Tournament Fantasy cricket is an online fantasy game, in which a
            user makes a virtual cricket team of eleven players from tournament
            Playing Playing teams.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col>
            Points are then scored depending on how the selected cricketers
            perform in the games happening. To win the League leagues, the users
            must strive to earn maximum points and get the highest points in the
            leaderboard.
          </Col>{' '}
        </Row>
        <Row className="contentRow">
          <Col>
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
          <Col md={4}>
            <Badge variant="light">Budget</Badge>
          </Col>
          <Col md={8}>
            Fantasy Team will have an budget cap, and the players need to be
            selected within the total credits that have been assigned
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="light">Transfer</Badge>
          </Col>
          <Col md={8}>
            Fantasy Team will have an Total Transfer cap for Tournament, User
            will get limited number of Transfer, which User should Use while
            playing Fantasy in Tournament
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
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
              <Badge variant="light">How to play? </Badge>
            </h3>
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="light">Create Team</Badge>
          </Col>
          <Col md={8}>
            To Play Fantasy Team will need Team First, Please Create Team by
            following rules
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="light">Create/Join League</Badge>
          </Col>
          <Col md={8}>
            Create league and Share code with Friends, Ask friends to join
            League. OR Join league create by Friends
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="light">Make Transfer</Badge>
          </Col>
          <Col md={8}>
            Once you create Team and joined League, Manage team as per match
            schedule, make Transfer before match starts.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
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

  function renderWhyFantasyUnique() {
    return (
      <div>
        <Row className="headerRow">
          <Col>
            <h3>
              <Badge variant="light">Why We are Different To Play? </Badge>
            </h3>
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="light">Tournament Fantasy</Badge>
          </Col>
          <Col md={8}>
            User will be playing Fantasy thoughout the Tournament with Single
            Team, Unlikes Other Leagues.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="light">Manage Transfer Budget</Badge>
          </Col>
          <Col md={8}>
            While Playing Fantasy League, you will need to manage your transfer
            properly, as you will be getting limited transfer for tournament.
            Unlike other League, where you can use daily new Teams
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="light">No Daily New Team</Badge>
          </Col>
          <Col md={8}>
            User will not need to create New team daily, Based on match User
            will only need to make some transfer in team.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="light">Friendly Fantasy with Friends</Badge>
          </Col>
          <Col md={8}>
            Fantasy will be friendly, as We are intended not to involve money
            prozes here, Any user can make team and play fantasy. You can
            created friendly League amongs your friends, You can join league
            crated by your friends.
          </Col>
        </Row>
      </div>
    );
  }

  function renderViaAccordion() {
    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Fantasy Rules
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{renderFantasyRules()}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              How To Play
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>{renderHowToPlay()}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              Why we are different
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>{renderWhyFantasyUnique()}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="3">
              How To Play
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <HowToPlay />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }

  function renderIPLPointSystems() {
    return <IPLPointSystems />;
  }

  return (
    <div>
      {renderFantasyDefinition()}
      {renderViaAccordion()}
      {renderIPLPointSystems()}
    </div>
  );
};

export default FantasyHelpContent;
