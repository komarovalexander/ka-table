import './PrintDemo.scss';

import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

import { DataType, Table } from '../../lib';

const dataArray = Array(180).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const PrintDemo: React.FC = () => {
  const componentRef = useRef<any>();

  return (
    <div className='print-demo'>
      <ReactToPrint
        trigger={() => <button>Click to Print</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef} className='print-content'>
        <Table
          columns= {[
            { key: 'column1', title: 'Column 1', dataType: DataType.String },
            { key: 'column2', title: 'Column 2', dataType: DataType.String },
            { key: 'column3', title: 'Column 3', dataType: DataType.String },
            { key: 'column4', title: 'Column 4', dataType: DataType.String },
          ]}
          data={dataArray}
          rowKeyField={'id'}
        />
      </div>
    </div>
  );
};

export default PrintDemo;
