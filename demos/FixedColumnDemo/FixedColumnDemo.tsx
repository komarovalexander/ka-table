import React from 'react';

import { Table } from 'ka-table';
import { DataType } from 'ka-table/enums';
import { Column } from 'ka-table/models';

const columns: Column[] = Array(20).fill(undefined).map(
  (_, index) => ({
    key: 'column' + index,
    style: { width: 150 },
    title: 'Column ' + index,
    type: DataType.String,
  }),
);

const dataArray = Array(30).fill(undefined).map(
  (_, index) => columns.reduce((previousValue: any, currentValue) => {
    previousValue[currentValue.key] = `${currentValue.key} row:${index}`;
    return previousValue;
  }, { id: index }),
);

const FixedColumnDemo: React.FC = () => (
  <div className='fixed-column-demo'>
    <Table
      columns={columns}
      data={dataArray}
      rowKeyField='id'
      childComponents={{
        headCell: {
          elementAttributes: (props) => {
              if (props.column.key === 'column0'){
                return { style: {
                  ...props.column.style,
                  position: 'sticky',
                  left: 0,
                  zIndex: 10,
                }
              }
            }
          }
        },
        cell: {
          elementAttributes: (props) => {
              if (props.column.key === 'column0'){
                return { style: {
                  ...props.column.style,
                  position: 'sticky',
                  left: 0,
                  backgroundColor: '#eee',
                }
              }
            }
          }
        }
      }}
    />
  </div>
);

export default FixedColumnDemo;
