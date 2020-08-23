import React, {useMemo} from 'react';
import DataTable from 'react-data-table-component';
import {Form, Button, Badge, Row, Col} from 'react-bootstrap';
import {customStyles} from 'common/components/DataTable';
import {ExpandPlayerRow} from './ExpandPlayerRow';
import '../UserTeam.styles.scss';
import {FantasyDropDown, Logo} from 'common/components';
import {renderLogoByPLayerType} from '../redux';
import {isListEmpty} from 'common/util';
import {getLogoNameByTeam} from 'common/components/FantasyDropDown';
import {minuscolor} from '@logos/index';
import {playerRowStyeForNew} from 'common/components/DataTable/TableConfig';
import {getCommonData} from '../../../common/redux';
import LoadingOverlay from 'react-loading-overlay';

const UserTeamPlayerDetails = ({
  data,
  captionId,
  onRemoveRowAction,
  updateCaptionAction,
  editable,
}: UserTeamPlayerDetails) => {
  const [filterText, setFilterText] = React.useState('');
  const configProps = getCommonData();
  function getDropDownPlayerList() {
    const list =
      data &&
      data.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          selected: item.id == captionId,
        };
      });
    return list || [];
  }
  const playerList = getDropDownPlayerList();

  function customName(row: any) {
    return (
      <div className="nameColumn">
        {row.name}
        <Logo logoSource={renderLogoByPLayerType(row.type)} width="15" />
      </div>
    );
  }

  function customTeam(row: any) {
    const teamName = !isListEmpty(row.teamsNameList)
      ? row.teamsNameList[0]
      : '';
    return (
      <div>
        <Logo logoSource={getLogoNameByTeam(teamName)} width="25" />
      </div>
    );
  }

  function removeAction(row: any) {
    return (
      <div>
        <span onClick={() => onRemoveRowAction(row)} className="removeIcon">
          <Logo logoSource={minuscolor} width="20" />
        </span>
      </div>
    );
  }

  const actionColumn: any[] = [
    {
      name: '',
      width: '10%',
      center: true,
      cell: removeAction,
    },
  ];

  const columns: any[] = [
    {
      name: 'TEAM',
      width: '15%',
      selector: 'teamsNameList',
      sortable: true,
      center: true,
      cell: customTeam,
    },
    {
      name: 'PLAYERS',
      selector: 'type',
      sortable: true,
      left: true,
      cell: customName,
    },
    {
      name: 'TYPE',
      selector: 'type',
      sortable: true,
      hide: 'sm',
    },
    {
      name: 'CREDITS',
      selector: 'value',
      width: '10%',
      center: true,
      sortable: true,
      style: {'font-weight': 'bold'},
    },
    {
      name: 'Country',
      selector: 'country',
      sortable: true,
      right: true,
      hide: 'sm',
    },
  ];

  const newColumns: any = onRemoveRowAction
    ? columns.concat(actionColumn)
    : columns;

  const renderCustomSearch = useMemo(() => {
    return (
      <div>
        <Row>
          <Col>
            <Form.Label>Search Player</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              placeholder="Name"
              onChange={(e: any) => setFilterText(e.target.value)}
              value={filterText}
            />
          </Col>
          <Col>
            <Form.Label>Captain Name</Form.Label>
            <FantasyDropDown
              onSelect={(value: string) => {
                updateCaptionAction(value);
              }}
              list={playerList}
              disabled={!editable}
            />
          </Col>
        </Row>
      </div>
    );
  }, [filterText, playerList]);

  const filteredRows =
    data &&
    data.filter(
      (item: any) =>
        item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
    );
  return (
    <div>
      <LoadingOverlay
        active={configProps.isLoading}
        spinner
        text="Loading Details ...">
        {data && data.length > 0 && (
          <DataTable
            noHeader
            columns={newColumns}
            customStyles={customStyles}
            fixedHeader
            data={filteredRows}
            subHeader
            highlightOnHover
            conditionalRowStyles={playerRowStyeForNew}
            subHeaderComponent={renderCustomSearch}
            subHeaderAlign="left"
            expandableRows={false}
            expandableRowsComponent={<ExpandPlayerRow />}
            defaultSortField="teamsNameList"
          />
        )}
      </LoadingOverlay>
    </div>
  );
};

export {UserTeamPlayerDetails};
