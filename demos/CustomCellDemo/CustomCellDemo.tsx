import './CustomCellDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { openEditor } from 'ka-table/actionCreators';
import { DataType, EditingMode } from 'ka-table/enums';
import { ICellTextProps } from 'ka-table/props';
import { DispatchFunc } from 'ka-table/types';
import dataArray from './data';

const CustomCell: React.FC<ICellTextProps> = ({
  column,
  dispatch,
  rowKeyValue,
  value,
}) => {
  return (
    <div onClick={() => {
      dispatch(openEditor(rowKeyValue, column.key));
    }} className={value ? 'custom-cell-demo-loyal' : 'custom-cell-demo-no-loyal'}>
      {value ? 'Loyal Program Member' : 'No Loyal Programm'}
    </div>
  );
};

const tablePropsInit: ITableProps = {
  columns: [
    {
      dataType: DataType.String,
      key: 'representative.name',
      width: 210,
      title: 'Representative',
    },
    {
      dataType: DataType.Boolean,
      key: 'company.hasLoyalProgram',
      style: { textAlign: 'center' },
      width: 200,
      title: 'Loyal Program',
    },
    {
      dataType: DataType.String,
      key: 'product.name',
      width: 110,
      title: 'Product',
    },
    {
      dataType: DataType.Number,
      key: 'product.price',
      style: { textAlign: 'right' },
      width: 130,
      title: 'Price',
    },
    {
      dataType: DataType.Date,
      key: 'firstDealDate',
      width: 150,
      title: 'First Deal Date',
    },
  ],
  format: ({ column, value }) => {
    if (column.key === 'product.price'){
      return `$${value}`;
    }
    if (column.dataType === DataType.Date){
      return value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' });
    }
  },
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
};

const CustomCellDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const onDispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <Table
      {...tableProps}
      childComponents={{
        cellText: {
          content: (props) => {
            switch (props.column.key){
              case 'company.hasLoyalProgram': return <CustomCell {...props}/>;
            }
          }
        }
      }}
      dispatch={onDispatch}
    />
  );
};

export default CustomCellDemo;
