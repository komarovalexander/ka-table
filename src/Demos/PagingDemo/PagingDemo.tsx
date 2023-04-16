import { DataType, EditingMode, PagingPosition, SortingMode } from '../../lib/enums';
import { Table, useTable } from '../../lib';

import React from 'react';

const dataArray = Array(180).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const PagingDemo: React.FC = () => {
  const table = useTable();

  return (
    <>
      Paging position: <select
        defaultValue={PagingPosition.Bottom}
        onChange={(e) => table.changeProps({ ...table.props, paging: { ...table.props.paging, position: e.target.value as any }})}
        style={{marginBottom: 20}}>
        <option value={PagingPosition.Bottom}>Bottom</option>
        <option value={PagingPosition.Top}>Top</option>
        <option value={PagingPosition.TopAndBottom}>TopAndBottom</option>
      </select>
      <Table
        table={table}
        columns= {[
          { key: 'id', title: 'Id', dataType: DataType.Number, isEditable: false },
          { key: 'column1', title: 'Column 1', dataType: DataType.String },
          { key: 'column2', title: 'Column 2', dataType: DataType.String },
          { key: 'column3', title: 'Column 3', dataType: DataType.String },
          { key: 'column4', title: 'Column 4', dataType: DataType.String },
        ]}
        data={dataArray}
        paging= {{
          enabled: true,
          pageIndex: 0,
          pageSize: 10,
          pageSizes: [5, 10, 15],
          position: PagingPosition.Bottom
        }}
        sortingMode={SortingMode.Single}
        editingMode={'cell'}
        rowKeyField={'id'}
      />
    </>
  );
};

export default PagingDemo;
