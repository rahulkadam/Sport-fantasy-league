import React from 'react';
import DataTable from 'react-data-table-component';
import {customShortStyles} from '../../DataTable/TableConfig';
import {
  battingPoints,
  bowlingPoints,
  captainPoints,
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

  function renderPointsCard(title: string, list: any, index: any) {
    return (
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={index}>
            {title}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={index}>
          <Card.Body> {renderPointsTable(list)}</Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }

  function renderPointSystemViaAccordion() {
    return (
      <Accordion>
        {renderPointsCard('Batting Points', battingPoints, '1')}
        {renderPointsCard('Bowling Points', bowlingPoints, '2')}
        {renderPointsCard('Fielding Points', fieldingPoints, '3')}
        {renderPointsCard('Captain Points', captainPoints, '4')}
      </Accordion>
    );
  }

  return (
    <div>
      <Row className="iplPointsTitle">
        <Col>Point System</Col>
      </Row>
      {renderPointSystemViaAccordion()}
    </div>
  );
};

export default IPLPointSystems;
