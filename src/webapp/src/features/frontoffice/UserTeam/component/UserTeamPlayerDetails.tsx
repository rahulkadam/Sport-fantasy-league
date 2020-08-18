import React, {useMemo, Fragment} from 'react';
import DataTable from 'react-data-table-component';
import {Form, Button, Badge, Col} from 'react-bootstrap';
import {customStyles} from 'common/components/DataTable';
import {ExpandPlayerRow} from './ExpandPlayerRow';
import {Icon} from 'common/styles/Icon';
import '../UserTeam.styles.scss';
import {playerRowStyles} from 'common/components/DataTable/TableConfig';
import {Logo} from 'common/components';
import {renderLogoByPLayerType} from '../redux';

const UserTeamPlayerDetails = ({
  data,
  title,
  onRemoveRowAction,
}: UserTeamPlayerDetails) => {
  const [filterText, setFilterText] = React.useState('');

  function customName(row: any) {
    return (
      <div>
        <Logo logoSource={renderLogoByPLayerType(row.type)} width="15" />
        {row.name}
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
      width: '5%',
      right: true,
      cell: removeAction,
    },
  ];

  const columns: any[] = [
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      cell: customName,
    },
    {
      name: 'Type',
      selector: 'type',
      sortable: true,
    },
    {
      name: 'Value',
      selector: 'value',
      width: '10%',
      sortable: true,
    },
    {
      name: 'Team',
      selector: 'teamsNameList',
      sortable: true,
      right: true,
      hide: 'sm',
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
          data={filteredRows}
          pagination
          paginationPerPage={11}
          subHeader
          subHeaderComponent={renderCustomSearch}
          subHeaderAlign="left"
          expandableRows
          expandableRowsComponent={<ExpandPlayerRow />}
          defaultSortField="type"
        />
      )}
    </div>
  );
};

export {UserTeamPlayerDetails};
