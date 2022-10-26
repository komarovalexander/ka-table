import './AlertCellDemo.scss';

import React from 'react';

import { DataType, Table } from '../../lib';
import { ICellTextProps } from '../../lib/props';

const dataArray = Array(10).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const AlertCell: React.FC<ICellTextProps> = ({
   rowData,
}) => {
  return (
    <img
      src='static/icons/alert.svg'
      className='alert-cell-button'
      alt=''
      onClick={() => alert(`Row data: \r\n${JSON.stringify(rowData)}`)}
    />
  );
};

const AlertCellDemo: React.FC = () => {
  return (
    <Table
      columns={[
        {
        key: 'command1',
        style: { textAlign: 'center' },
        width: 70
        },
        { key: 'column1-1', field: 'column1', title: 'Column 1', dataType: DataType.String },
        { key: 'column1-2', field: 'column1', title: 'Column 1', dataType: DataType.String },
        { key: 'column2', title: 'Column 2', dataType: DataType.String },
        { key: 'column3', title: 'Column 3', dataType: DataType.String },
        { key: 'column4', title: 'Column 4', dataType: DataType.String },
      ]}
      data={dataArray}
      rowKeyField={'id'}
      childComponents={{
        cellText: {
          content: (props) => {
            switch (props.column.key){
              case 'command1': return <AlertCell {...props}/>;
            }
          }
        }
      }}
    />
  );
};

export default AlertCellDemo;
