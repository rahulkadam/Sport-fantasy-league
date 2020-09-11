import React from 'react';
import DataTable from 'react-data-table-component';
import {customShortStyles} from '../../DataTable/TableConfig';
import {Accordion, Button, Card, Row, Col} from 'react-bootstrap';
import '../points/PointSystems.styles.scss';

const TransferHelp = () => {
  function customPoints(row: any) {
    return <div className="pointsPositive">{row.transfer}</div>;
  }

  const groupstages = [{matches: 56, transfer: 90}];
  const knockoutstages = [{matches: 4, transfer: 10}];

  const columns = [
    {
      name: 'Matches',
      selector: 'matches',
      left: true,
    },
    {
      name: 'Transfer',
      selector: 'transfer',
      right: true,
      cell: customPoints,
    },
  ];

  function renderTransferTable(list: any) {
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
          <Card.Body> {renderTransferTable(list)}</Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  }

  function renderTrasnferSystemViaAccordion() {
    return (
      <Accordion>
        {renderPointsCard('Group Stages', groupstages, '1')}
        {renderPointsCard('Knockout Match', knockoutstages, '2')}
      </Accordion>
    );
  }

  return (
    <div>
      <Row className="iplPointsTitle">
        <Col>Transfer</Col>
      </Row>
      <Row>
        <Col>
          Transfer will get reset, before first group match start, or knockout
          match starts
        </Col>
      </Row>
      <Row>
        <Col>
          <strong>You can make unlimited changes for Captain!</strong>
        </Col>
      </Row>
      {renderTrasnferSystemViaAccordion()}
    </div>
  );
};

export default TransferHelp;
