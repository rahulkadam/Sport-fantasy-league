import React from 'react';
import DataTable from 'react-data-table-component';
import {customShortStyles} from 'common/components/DataTable/TableConfig';
import {Row, Col} from 'react-bootstrap';
const TeamCriteria = ({criteria}: TeamCriteriaProps) => {
  const columns = [
    {
      name: 'Type',
      selector: 'shortName',
    },
    {
      name: 'Min',
      selector: 'minPerTeam',
    },
    {
      name: 'Max',
      selector: 'maxPerTeam',
    },
  ];
  function renderTeamCriteriaInTable() {
    return (
      <DataTable
        noHeader={true}
        columns={columns}
        customStyles={customShortStyles}
        data={criteria.playerCriteriaDTOList}
        highlightOnHover
        dense
      />
    );
  }
  return (
    <div>
      <Row>
        <Col>Team Criteria</Col>
        <Col>
          Total Player :{' '}
          {criteria.teamCriteriaDTO &&
            criteria.teamCriteriaDTO.totalPlayerCount}
        </Col>
      </Row>
      {renderTeamCriteriaInTable()}
    </div>
  );
};

export default TeamCriteria;
