import React, {useMemo, Fragment} from 'react';
import DataTable from 'react-data-table-component';
import {Form, Button, Badge, Col} from 'react-bootstrap';
import {customStyles} from 'common/components/DataTable';
import {ExpandPlayerRow} from './ExpandPlayerRow';
import {Icon} from 'common/styles/Icon';
import '../UserTeam.styles.scss';
import {Logo} from 'common/components';
import {renderLogoByPLayerType} from '../redux';
import {isListEmpty} from 'common/util';
import {getLogoNameByTeam} from 'common/components/FantasyDropDown';

const UserTeamPlayerDetails = ({
  data,
  title,
  onRemoveRowAction,
}: UserTeamPlayerDetails) => {
  const [filterText, setFilterText] = React.useState('');

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
        <Icon
          name="delete"
          onClick={() => {
            onRemoveRowAction(row);
          }}
          className="removeIcon"
        />
        {row.isNew && (
          <Badge pill variant={'success'}>
            New
          </Badge>
        )}
      </div>
    );
  }

  const actionColumn: any[] = [
    {
      name: 'Action',
      width: '10%',
      center: true,
      cell: removeAction,
    },
  ];

  const columns: any[] = [
    {
      name: 'Team',
      width: '15%',
      selector: 'teamsNameList',
      sortable: true,
      center: true,
      cell: customTeam,
    },
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      left: true,
      cell: customName,
    },
    {
      name: 'Type',
      selector: 'type',
      sortable: true,
      hide: 'sm',
    },
    {
      name: 'Value',
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
    ? actionColumn.concat(columns)
    : columns;

  const renderCustomSearch = useMemo(() => {
    return (
      <div>
        <Form.Control
          type="text"
          placeholder="Player Name"
          onChange={(e: any) => setFilterText(e.target.value)}
          value={filterText}
        />
      </div>
    );
  }, [filterText]);

  const filteredRows =
    data &&
    data.filter(
      (item: any) =>
        item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
    );
  // conditionalRowStyles={playerRowStyles}
  return (
    <div>
      {data && data.length > 0 && (
        <DataTable
          title={title}
          columns={newColumns}
          customStyles={customStyles}
          fixedHeader
          data={filteredRows}
          subHeader
          highlightOnHover
          subHeaderComponent={renderCustomSearch}
          subHeaderAlign="left"
          striped
          expandableRows
          expandableRowsComponent={<ExpandPlayerRow />}
          defaultSortField="teamsNameList"
        />
      )}
    </div>
  );
};

export {UserTeamPlayerDetails};
