import React from 'react';
import '../Home.styles.scss';
import {Badge, Col, Row, Accordion, Card, Button} from 'react-bootstrap';
import HowToPlay from './HowToPlay';
import IPLPointSystems from '../../../../common/components/HelpPage/points/IPLPointSystems';
import TransferHelp from '../../../../common/components/HelpPage/transfer/TransferHelp';

const FantasyHelpContent = () => {
  function renderBoldText(text: string) {
    return <span className="boldspan">{text}</span>;
  }
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
            IPL Fantasy League is an {renderBoldText('online fantasy game')}, in
            which a user form a{' '}
            {renderBoldText('virtual cricket team of 11 players')} from IPL
            teams.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col>
            Points scored depending on{' '}
            {renderBoldText('how the your team player perform')} in the match.
          </Col>{' '}
        </Row>
        <Row className="contentRow">
          <Col>
            The main aim is to Play friendly Fantasy Cricket With your friend,
            In IPL with your team by managing transfer properly!
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
              <Badge variant="light">Rules for IPL Fantasy League? </Badge>
            </h3>
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="light">Budget</Badge>
          </Col>
          <Col md={8}>
            Fantasy Team will have an budget cap of 100, and the players need to
            be selected within 100.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="light">Transfer</Badge>
          </Col>
          <Col md={8}>
            Fantasy Team will have an Total Transfer cap for IPL, User will get
            {renderBoldText(
              ' 90 Transfer in Group matches and 10 in knockout.'
            )}
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="light">Player Selection Rules</Badge>
          </Col>
          <Col md={8}>
            Fantasy Team will have 11 Players in Team.{' '}
            {renderBoldText('Min 1 WK, 3 Bats, 3 Bowl and  1 Allrounder')}
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
            Play IPl fantasy like FPL,{' '}
            {renderBoldText('one team , manage transfer and calculate points.')}
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="light">Manage Transfer Budget</Badge>
          </Col>
          <Col md={8}>
            Play IPL fantasy with limited transfer for IPL{' '}
            {renderBoldText('90 for group stages and 10 for knockout')}.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="light">No Daily New Team</Badge>
          </Col>
          <Col md={8}>
            {renderBoldText('No New team daily')}, Based on match User will only
            need to make some transfer in team.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="light">Friendly Fantasy with Friends</Badge>
          </Col>
          <Col md={8}>
            {renderBoldText('Fantasy will be friendly, No Money involved')}, You
            can created friendly League among your friends, You can join league
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

  function renderTransferHelp() {
    return <TransferHelp />;
  }

  return (
    <div>
      {renderFantasyDefinition()}
      {renderViaAccordion()}
      {renderIPLPointSystems()}
      {renderTransferHelp()}
    </div>
  );
};

export default FantasyHelpContent;
