import React from 'react';
import Helmet from 'react-helmet';
import {Card, Accordion, Row, Col, Container} from 'react-bootstrap';
import {
  HelpContentConfigData,
  HelpContentConfigObject,
  Subtopic,
} from './HelpContentConfigData';

const HelpPage = () => {
  const helpContent = HelpContentConfigData.HelpContent;
  const subtopicAccordions: JSX.Element[] = [];
  const menus: JSX.Element[] = [];
  const firstTopicId = helpContent[0].id;

  /**
   * render all subtopics of a given topic
   */
  function renderSubtopics(id: string, subtopics: Subtopic[]): JSX.Element[] {
    const subtopicElements: JSX.Element[] = [];
    const targetId = id + 'Target';
    subtopics.forEach(function (subtopic: Subtopic, index: number) {
      subtopicElements.push(
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey={targetId + index}
            className="btn text-dark text-left">
            {subtopic.question}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={targetId + index}>
            <Card.Body dangerouslySetInnerHTML={{__html: subtopic.answer}} />
          </Accordion.Collapse>
        </Card>
      );
    });
    return subtopicElements;
  }

  /**
   * render topic's menu
   */
  function renderMenu(id: string, topicName: string): JSX.Element {
    const targetId = id + 'Target';
    return (
      <Row>
        <Accordion.Toggle
          eventKey={targetId}
          className="mx-4 border rounded btn btn-block btn-sm mb-1">
          <h5>{topicName}</h5>
        </Accordion.Toggle>
      </Row>
    );
  }

  /**
   * render help content
   */
  function renderHelpContent(): JSX.Element {
    helpContent.forEach((data: HelpContentConfigObject) => {
      const id = data.id;
      const targetId = id + 'Target';
      subtopicAccordions.push(
        <Accordion.Collapse eventKey={targetId}>
          <Accordion defaultActiveKey={targetId + '0'}>
            {renderSubtopics(id, data.subtopics)}
          </Accordion>
        </Accordion.Collapse>
      );
      menus.push(renderMenu(id, data.topicName));
    });
    return (
      <Row className="justify-content-center">
        <Col md={5} className="px-0 mb-3">
          {subtopicAccordions}
        </Col>
        <Col md={3}>{menus}</Col>
      </Row>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Help - Astro Payment Gateway</title>
        <meta
          name="description"
          content="Astro Payment Gateway Help & Support - Get help on payment, billing issues, payment methods, and how to reconnect your account; learn more about Astro Payment Gateway and other FAQs"
        />
        <meta
          property="og:title"
          content="Astro Payment Help | Astro Payment Gateway Help | Astro Billing Help "
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pay.astro.com.my/apg/help" />
        <link rel="canonical" href="https://pay.astro.com.my/apg/help" />
        <meta property="og:site_name" content="Astro Payment Gateway" />
        <meta
          property="og:description"
          content="Help and FAQ for Astro Payment Gateway"
        />
        <meta
          property="og:image"
          content="<%=host%>/Resources/images/logos/astro_share.png"
        />
        <meta
          name="keywords"
          content="astro bill, astro quick pay, astro pay bill, quick pay astro bill payment, online bill, quick bill payment, astro bill help, faq, info, how to pay astro bill, astro payment gateway help, astro payment gateway faq, astro bill pay faq, astro bill payment faq, astro bill payment help, what is quick pay, what is quickpay, what is apg, what is my astro account number, what is my account number, astro account disconnected, astro account not available, astro payment unsuccessful, astro reconnect account, astro payment extra charges, astro payment methods"
        />
      </Helmet>
      <Container className="mt-3">
        <h4 className="text-center mb-4">Astro Payment Gateway Help</h4>
        <Accordion defaultActiveKey={firstTopicId + 'Target'}>
          {renderHelpContent()}
        </Accordion>
      </Container>
    </div>
  );
};

export {HelpPage};
