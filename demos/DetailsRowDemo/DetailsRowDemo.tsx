import { DataType, Table } from 'ka-table';
import { ICellTextProps, IDataRowProps } from 'ka-table/props';
import { hideDetailsRow, showDetailsRow } from 'ka-table/actionCreators';

import React from 'react';

const dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const DetailsButton: React.FC<ICellTextProps> = ({
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

const DetailsRow: React.FC<IDataRowProps> = ({
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

const DetailsRowDemo: React.FC = () => {
  return (
    <Table
      columns= {[
        { key: 'show-hide-details-row' },
        { key: 'column1', title: 'Column 1', dataType: DataType.String },
        { key: 'column2', title: 'Column 2', dataType: DataType.String },
        { key: 'column3', title: 'Column 3', dataType: DataType.String },
        { key: 'column4', title: 'Column 4', dataType: DataType.String },
      ]}
      data={dataArray}
      detailsRows={[1]}
      rowKeyField={'id'}
      childComponents={{
        cellText: {
          content: (props) => {
            switch (props.column.key){
              case 'show-hide-details-row': return <DetailsButton {...props}/>;
            }
          }
        },
        detailsRow: {
          elementAttributes: () => ({
            style: {
              backgroundColor: '#eee'
            }
          }),
          content: DetailsRow
        }
      }}
    />
  );
};

export default DetailsRowDemo;
