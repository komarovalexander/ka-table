import './PrintDemo.scss';

import React, { useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';

const dataArray = Array(180).fill(undefined).map(
  (_, index) => ({
    column1: `column:1 row:${index}`,
    column2: `column:2 row:${index}`,
    column3: `column:3 row:${index}`,
    column4: `column:4 row:${index}`,
    id: index,
  }),
);

const tableOption: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.String },
    { key: 'column2', title: 'Column 2', dataType: DataType.String },
    { key: 'column3', title: 'Column 3', dataType: DataType.String },
    { key: 'column4', title: 'Column 4', dataType: DataType.String },
  ],
  data: dataArray,
  rowKeyField: 'id',
};

const PrintDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const dispatch: DispatchFunc = (action) => {
    changeOptions((prevState: ITableProps) => kaReducer(prevState, action));
  };
  const componentRef = useRef<any>();

  return (
    <div className='print-demo'>
      <ReactToPrint
        trigger={() => <button>Click to Print</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef} className='print-content'>
        <Table
          {...option}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
};

export default PrintDemo;
