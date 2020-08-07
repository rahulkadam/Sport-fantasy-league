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
        <title>Help - Sport Fantasy</title>
      </Helmet>
      <Container className="mt-3">
        <h4 className="text-center mb-4">Sport Fantasy Help</h4>
        <Accordion defaultActiveKey={firstTopicId + 'Target'}>
          {renderHelpContent()}
        </Accordion>
      </Container>
    </div>
  );
};

export {HelpPage};
