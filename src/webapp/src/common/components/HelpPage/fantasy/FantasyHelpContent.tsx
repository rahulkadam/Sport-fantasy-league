import React from 'react';
import {Badge, Col, Row, Accordion, Card, Button} from 'react-bootstrap';
import HowToPlay from './HowToPlay';
import IPLPointSystems from '../points/IPLPointSystems';
import TransferHelp from '../transfer/TransferHelp';
import TeamCriteria from 'features/frontoffice/UserTeam/component/common/TeamCriteria';
import '../help.styles.scss';
import {FantasyFAQ} from './FantasyFAQ';

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
        <Row>
          <Col className="textFont">
            <h3>
              <Badge variant="info">Fantasy League</Badge>
            </h3>
          </Col>
        </Row>
        <Row className="contentRow">
          <Col className="textFont">
            Fantasy League is an {renderBoldText('online fantasy game')}, in
            which a user form a{' '}
            {renderBoldText('virtual cricket team of 11 players')} from IPL
            teams.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col className="textFont">
            Points scored depending on{' '}
            {renderBoldText('how team player perform')} in the match.
          </Col>{' '}
        </Row>
        <Row className="contentRow">
          <Col className="textFont">
            The main <strong>aim is to Play friendly Fantasy Cricket</strong>{' '}
            With your friend, by managing transfer properly for Full season!
          </Col>
        </Row>
      </div>
    );
  }

  function renderFantasyRules() {
    return (
      <div>
        <Row className="headerRow">
          <Col className="iplContentTitle">Rules for IPL Fantasy League?</Col>
        </Row>
        <Row className="contentRow">
          <Col md={4} className="textFont">
            <Badge variant="success">Budget</Badge>
          </Col>
          <Col md={8} className="textFont">
            Fantasy Team will have an{' '}
            {renderBoldText('budget cap of 100 for 11 Players')}.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="success">Transfer</Badge>
          </Col>
          <Col md={8} className="textFont">
            Total 100 Transfer
            {renderBoldText(
              ' 90 Transfer in Group matches and 10 in knockout.'
            )}
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4} className="textFont">
            <Badge variant="success">Player Selection Rules</Badge>
          </Col>
          <Col md={8} className="textFont">
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
          <Col className="iplContentTitle">Why We are Different To Play?</Col>
        </Row>
        <Row className="contentRow">
          <Col md={4} className="textFont">
            <Badge variant="success">Tournament Fantasy</Badge>
          </Col>
          <Col md={8} className="textFont">
            {renderBoldText(
              'Play with one team , make transfer on each match day'
            )}
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4} className="textFont">
            <Badge variant="success">No Daily New Team</Badge>
          </Col>
          <Col md={8} className="textFont">
            {renderBoldText('No New team daily')}, Based on match User will only
            need to make some transfer in team.
          </Col>
        </Row>
        <Row className="contentRow">
          <Col md={4}>
            <Badge variant="success">Friendly Fantasy with Friends</Badge>
          </Col>
          <Col md={8} className="textFont">
            {renderBoldText('Fantasy will be friendly, No Money involved')}, You
            can created friendly League among your friends, You can join league
            created by your friends.
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
              What is Fantasy League?
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>{renderFantasyDefinition()}</Card.Body>
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

  function renderFAQ() {
    return (
      <div>
        <Row className="iplContentTitle">
          <Col>FAQs</Col>
        </Row>
        <FantasyFAQ />
      </div>
    );
  }

  return (
    <div>
      <Row className="iplContentTitle">
        <Col>IPL Fantasy League</Col>
      </Row>
      {renderIPLPointSystems()}
      {renderTransferHelp()}
      {renderTeamCriteria()}
      <HowToPlay />
      {renderViaAccordion()}
      {renderFAQ()}
    </div>
  );
};

export default FantasyHelpContent;
