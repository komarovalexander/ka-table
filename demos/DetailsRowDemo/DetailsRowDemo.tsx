import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { hideDetailsRow, showDetailsRow } from 'ka-table/actionCreators';
import { DataType } from 'ka-table/enums';
import { CellFunc, DataRowFunc, DispatchFunc } from 'ka-table/types';

const dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const DetailsButton: CellFunc = ({
  dispatch,
  rowKeyValue,
  isDetailsRowShown,
}) => {
  return (
    <button onClick={() => {
      dispatch(isDetailsRowShown ? hideDetailsRow(rowKeyValue) : showDetailsRow(rowKeyValue));
    }}>
      {isDetailsRowShown ? 'Hide' : 'Show'} Details Row
    </button>
  );
};

const DetailsRow: DataRowFunc = ({
  rowData,
}) => {
  return (
    <div>
      <h3>DetailsRow #{rowData.id}</h3>
      <p>Column 1: {rowData.column1}</p>
      <p>Column 2: {rowData.column2}</p>
      <p>Column 3: {rowData.column3}</p>
      <p>Column 4: {rowData.column4}</p>
    </div>
  );
};

const tableOption: ITableProps = {
  columns: [
    { key: 'show-hide-details-row', cell: DetailsButton },
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String }
  ],
  data: dataArray,
  detailsRows: [1],
  detailsRow: DetailsRow,
  rowKeyField: 'id',
};

const DetailsRowDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const dispatch: DispatchFunc = (action) => {
    changeOptions((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <Table
      {...option}
      dispatch={dispatch}
      childAttributes={{
        detailsRow: {
          style: {
            backgroundColor: '#eee'
          }
        }
      }}
    />
  );
};

export default DetailsRowDemo;
