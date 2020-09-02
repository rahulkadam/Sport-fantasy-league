import React from 'react';
import DataTable from 'react-data-table-component';
import {customShortStyles} from '../../DataTable/TableConfig';
import {
  battingPoints,
  bowlingPoints,
  fieldingPoints,
} from './IPLPointsCriteriaData';
import {Accordion, Button, Card, Row, Col} from 'react-bootstrap';
import './PointSystems.styles.scss';

const IPLPointSystems = () => {
  function customPoints(row: any) {
    const pointsClass = row.points > 0 ? 'pointsPositive' : 'pointsNegative';
    return <div className={pointsClass}>{row.points}</div>;
  }

  const columns = [
    {
      name: 'Type',
      selector: 'name',
      left: true,
    },
    {
      name: 'Points',
      selector: 'points',
      right: true,
      cell: customPoints,
    },
  ];

  function renderPointsTable(list: any) {
    return (
      <DataTable
        noHeader={true}
        columns={columns}
        customStyles={customShortStyles}
        data={list}
        highlightOnHover
        dense
      />
    );
  }

  function renderPointSystemViaAccordion() {
    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Batting Points
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body> {renderPointsTable(battingPoints)}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Bowling Points
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body> {renderPointsTable(bowlingPoints)}</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              Fielding Points
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body> {renderPointsTable(fieldingPoints)}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }

  return (
    <div>
      <Row className="iplPointsTitle">
        <Col>IPL Point System</Col>
      </Row>
      {renderPointSystemViaAccordion()}
    </div>
  );
};

export default IPLPointSystems;
