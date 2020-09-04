import React from 'react';
import {Badge, Col, Row, Accordion, Card, Button} from 'react-bootstrap';
import HowToPlay from './HowToPlay';
import IPLPointSystems from '../points/IPLPointSystems';
import TransferHelp from '../transfer/TransferHelp';
import TeamCriteria from 'features/frontoffice/UserTeam/component/common/TeamCriteria';
import '../help.styles.scss';

const FantasyHelpContent = () => {
  function renderBoldText(text: string) {
    return <span className="boldspan">{text}</span>;
  }
  function renderFantasyDefinition() {
    return (
      <div>
        <Row className="iplContentTitle">
          <Col>IPL Fantasy League</Col>
        </Row>
        <Row className="headerRow">
          <Col>
            <h3>
              <Badge variant="info">What is IPL Fantasy League? </Badge>
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
            {renderBoldText('how team player perform')} in the match.
          </Col>{' '}
        </Row>
        <Row className="contentRow">
          <Col>
            The main <strong>aim is to Play friendly Fantasy Cricket</strong>{' '}
            With your friend, In IPL with your team by managing transfer
            properly!
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
              <Badge variant="info">Rules for IPL Fantasy League? </Badge>
            </h3>
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="success">Budget</Badge>
          </Col>
          <Col md={8}>
            Fantasy Team will have an {renderBoldText('budget cap of 100')}, and
            the players need to be selected within 100.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="success">Transfer</Badge>
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
            <Badge variant="success">Player Selection Rules</Badge>
          </Col>
          <Col md={8}>
            Fantasy Team will have 11 Players in Team.{' '}
            {renderBoldText('Min 1 WK, 3 Bats, 3 Bowl and  1 Allrounder')}
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
              <Badge variant="info">Why We are Different To Play? </Badge>
            </h3>
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="success">Tournament Fantasy</Badge>
          </Col>
          <Col md={8}>
            Play IPl fantasy like FPL,{' '}
            {renderBoldText('one team , manage transfer and calculate points.')}
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="success">Manage Transfer Budget</Badge>
          </Col>
          <Col md={8}>
            Play IPL fantasy with limited transfer for IPL{' '}
            {renderBoldText('90 for group stages and 10 for knockout')}.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="success">No Daily New Team</Badge>
          </Col>
          <Col md={8}>
            {renderBoldText('No New team daily')}, Based on match User will only
            need to make some transfer in team.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="success">Friendly Fantasy with Friends</Badge>
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

  function renderTeamCriteria() {
    const criteria = [
      {
        shortName: 'BATS',
        minPerTeam: 3,
        maxPerTeam: 6,
      },
      {
        shortName: 'BOWL',
        minPerTeam: 3,
        maxPerTeam: 6,
      },
      {
        shortName: 'AR',
        minPerTeam: 1,
        maxPerTeam: 4,
      },
      {
        shortName: 'WK',
        minPerTeam: 1,
        maxPerTeam: 4,
      },
    ];
    const dto = {
      playerCriteriaDTOList: criteria,
      teamCriteriaDTO: {totalPlayerCount: 11},
    };
    return (
      <div>
        <Row className="iplContentTitle">
          <Col>Team Criteria</Col>
        </Row>
        <TeamCriteria criteria={dto} />
      </div>
    );
  }
  return (
    <div>
      {renderFantasyDefinition()}
      {renderViaAccordion()}
      {renderIPLPointSystems()}
      {renderTransferHelp()}
      {renderTeamCriteria()}
    </div>
  );
};

export default FantasyHelpContent;
