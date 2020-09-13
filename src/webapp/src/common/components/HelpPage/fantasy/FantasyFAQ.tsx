import React from 'react';
import {Accordion, Button, Card} from 'react-bootstrap';
import {faqConfig} from './FantasyFaqConfig';

const FantasyFAQ = () => {
  function renderPointsCard(title: string, answer: string, index: any) {
    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={index}>
            {title}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={index}>
          <Card.Body> {answer}</Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }

  function renderTrasnferSystemViaAccordion() {
    const cardArray: any = [];
    faqConfig.forEach(config => {
      cardArray.push(
        renderPointsCard(config.question, config.answer, config.index)
      );
    });
    return <Accordion>{cardArray}</Accordion>;
  }

  return <div>{renderTrasnferSystemViaAccordion()}</div>;
};

export {FantasyFAQ};
