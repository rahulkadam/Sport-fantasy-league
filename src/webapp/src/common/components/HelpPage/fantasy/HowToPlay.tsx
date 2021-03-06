import React, {useState} from 'react';
import {Logo, StatusMessage} from 'common/components/index';
import {
  colorground,
  colorteam,
  colortransfer,
  rankingblack,
} from '@logos/index';
import {Col, Row, Button} from 'react-bootstrap';
import history from 'common/config/history';
import {getAccessToken} from '../../../../API';

const HowToPlay = () => {
  const [showAlert, setShowAlert] = useState(false);
  const accessToken = getAccessToken();
  const FantasyPlaySteps = [
    {
      logo: colorteam,
      title: 'Create Your Team',
      link: '/team',
      textMsg: 'Pick 11 Players and Create Team',
    },
    {
      logo: colorground,
      title: 'Create/Join League',
      link: '/league',
      textMsg: 'join or create leagues to compete with friends',
    },
    {
      logo: colortransfer,
      title: 'Manage Transfer',
      link: '/transfers',
      textMsg: 'Make Transfer wisely, as You will have limited transfer',
    },
    {
      logo: rankingblack,
      title: 'Ranking',
      link: '/league',
      textMsg: 'Check ranking against League Friends/Sport Community',
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
        <Col md={4} xs={5} sm={5} className="stepHeaderLogoCol">
          {renderLeftSide(step.logo)}
        </Col>
        <Col md={4} xs={7} sm={7} className="stepHeaderContentCol">
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
      <Row>
        <Col className="iplContentTitle">HOW TO PLAY</Col>
      </Row>
      {renderFantasyPlaySteps()}
    </div>
  );
};

export default HowToPlay;
