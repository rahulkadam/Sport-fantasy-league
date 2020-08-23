import React, {useState} from 'react';
import {Logo, StatusMessage} from '../../../../common/components';
import {
  colorground,
  colorteam,
  colortransfer,
  rankingblack,
} from '@logos/index';
import {Badge, Col, Row, Button} from 'react-bootstrap';
import history from 'common/config/history';
import Login from '../../../Authentication/components';
import {getAccessToken} from '../../../../API';

const HowToPlay = () => {
  const [showAlert, setShowAlert] = useState(false);
  const accessToken = getAccessToken();
  const FantasyPlaySteps = [
    {
      logo: colorteam,
      title: 'Create Your Team',
      link: '/team',
      textMsg:
        'To Play Fantasy Team will need Team First, Please Create Team by following rules',
    },
    {
      logo: colorground,
      title: 'Create/Join League',
      link: '/league',
      textMsg:
        'Create league and Share code with Friends, Ask friends to join League. OR Join league create by Friends',
    },
    {
      logo: colortransfer,
      title: 'Manage Transfer',
      link: '/transfers',
      textMsg:
        'Follow Tournament Matches and Change Team , bases on Match Schedule, Follow coming match and make transfer',
    },
    {
      logo: rankingblack,
      title: 'Ranking with Fantasy Friends',
      link: '/league',
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
  function renderRightSideSide(title: string, text: string, link: string) {
    return (
      <div>
        <Row className="contentRow">
          <Col>
            <Button
              variant="link"
              onClick={() => {
                if (accessToken) {
                  history.push(link);
                } else {
                  setShowAlert(true);
                }
              }}>
              {title}
            </Button>
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
          {renderRightSideSide(step.title, step.textMsg, step.link)}
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

  function renderLoginAlert() {
    return <StatusMessage type="warning" text="Please Login and proceed" />;
  }

  return (
    <div>
      {showAlert && renderLoginAlert()}
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
