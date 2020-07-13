import './CustomCellDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { openEditor } from '../../lib/actionCreators';
import { DataType, EditingMode } from '../../lib/enums';
import { CellFuncPropsWithChildren, DispatchFunc } from '../../lib/types';
import dataArray from './data';

const CustomCell: React.FC<CellFuncPropsWithChildren> = ({
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

const CustomImageCell: React.FC<CellFuncPropsWithChildren> = ({
  value,
}) => {
  return (
    <div>
      <img className='custom-cell-image' src={value} alt=''/>
    </div>
  );
};

const tablePropsInit: ITableProps = {
  columns: [
    {
      dataType: DataType.String,
      key: 'representative.image',
      style: { width: '40px' },
      title: 'Image',
    },
    {
      dataType: DataType.String,
      key: 'representative.name',
      style: { width: '200px' },
      title: 'Representative',
    },
    {
      dataType: DataType.Boolean,
      key: 'company.hasLoyalProgram',
      style: { width: '170px', textAlign: 'center' },
      title: 'Loyal Program',
    },
    {
      dataType: DataType.String,
      key: 'product.name',
      style: {
        width: '80px',
      },
      title: 'Product',
    },
    {
      dataType: DataType.Number,
      key: 'product.price',
      style: { width: '100px', textAlign: 'right' },
      title: 'Price',
    },
    {
      dataType: DataType.Date,
      key: 'firstDealDate',
      style: { width: '150px' },
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
              case 'representative.image': return <CustomImageCell {...props}/>;
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
