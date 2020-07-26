import React, { useState } from 'react';
import { CSVLink } from 'react-csv';

import { ITableProps, kaReducer, Table } from '../../lib';
import { DataType } from '../../lib/enums';
import { DispatchFunc } from '../../lib/types';
import { kaPropsUtils } from '../../lib/utils';

const dataArray = Array(7).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  data: dataArray,
  rowKeyField: 'id',
};

const ExportDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <div>
      <div style={{
        marginBottom: 20,
        marginLeft: 20
      }}>
        <CSVLink
          data={kaPropsUtils.getData(tableProps)}
          headers={tableProps.columns.map(c => ({ label: c.title!, key: c.key! }))}
          filename='ka-table.data.csv'>
          Download .csv
        </CSVLink>
      </div>
      <Table
        {...tableProps}
        dispatch={dispatch}
        childComponents={{
          table: {
            elementAttributes: () => ({
              id: 'table-to-xls'
            })
          }
        }}
      />
    </div>
  );
};

export default ExportDemo;
