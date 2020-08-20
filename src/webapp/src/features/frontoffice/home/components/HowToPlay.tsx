import React from 'react';
import {Logo} from '../../../../common/components';
import {
  colorground,
  colorteam,
  colortransfer,
  rankingblack,
} from '@logos/index';
import {Badge, Col, Row, Accordion, Card, Button} from 'react-bootstrap';

const HowToPlay = () => {
  const FantasyPlaySteps = [
    {
      logo: colorteam,
      title: 'Create Your Team',
      textMsg:
        'To Play Fantasy Team will need Team First, Please Create Team by following rules',
    },
    {
      logo: colorground,
      title: 'Create/Join League',
      textMsg:
        'Create league and Share code with Friends, Ask friends to join League. OR Join league create by Friends',
    },
    {
      logo: colortransfer,
      title: 'Manage Transfer',
      textMsg:
        'Follow Tournament Matches and Change Team , bases on Match Schedule, Follow coming match and make transfer',
    },
    {
      logo: rankingblack,
      title: 'Ranking with Fantasy Friends',
      textMsg:
        'Check Ranking and league score, Check your ranking in league with Friends',
    },
  ];

  function renderLeftSide(logoName: string) {
    return (
      <div>
        <Logo logoSource={logoName} width="120" />
      </div>
    );
  }
  function renderRightSideSide(title: string, text: string) {
    return (
      <div>
        <Row className="contentRow">
          <Col>
            <Badge variant="light">{title}</Badge>
          </Col>
        </Row>
        <Row className="contentRow">
          <Col>{text}</Col>
        </Row>
      </div>
    );
  }

  function renderFantasyStep(step: any) {
    return (
      <Row>
        <Col className="stepHeaderLogoCol">{renderLeftSide(step.logo)}</Col>
        <Col className="stepHeaderContentCol">
          {renderRightSideSide(step.title, step.textMsg)}
        </Col>
      </Row>
    );
  }

  function renderFantasyPlaySteps() {
    const stepsObj: any = [];
    FantasyPlaySteps.forEach(step => {
      stepsObj.push(renderFantasyStep(step));
    });
    return <div>{stepsObj}</div>;
  }

  return (
    <div>
      <Row className="headerRow justify-content-center">
        <Col>
          <h3>How to play Tournament Fantasy Cricket?</h3>
        </Col>
      </Row>
      {renderFantasyPlaySteps()}
    </div>
  );
};

export default HowToPlay;
