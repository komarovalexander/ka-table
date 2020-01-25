import './CustomCellDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { ActionType, DataType, EditingMode } from '../../lib/enums';
import { Cell } from '../../lib/models';
import { CellFuncPropsWithChildren, DataChangeFunc, OptionChangeFunc } from '../../lib/types';
import dataArray from './data';

const CustomCell: React.FC<CellFuncPropsWithChildren> = ({
  column: {
    key,
  },
  dispatch,
  rowData,
  rowKeyField,
  value,
}) => {
  return (
    <div onClick={() => {
      const cell: Cell = { columnKey: key, rowKey: rowData[rowKeyField] };
      dispatch(ActionType.OpenEditor, { cell });
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

const tableOption: ITableOption = {
  columns: [
    {
      cell: CustomImageCell,
      dataType: DataType.String,
      field: 'image',
      fieldParents: ['representative'],
      key: 'representative.image',
      style: {
        width: '40px',
      },
      title: 'Image',
    },
    {
      dataType: DataType.String,
      field: 'name',
      fieldParents: ['representative'],
      key: 'representative.name',
      style: { width: '200px' },
      title: 'Representative',
    },
    {
      cell: CustomCell,
      dataType: DataType.Boolean,
      fieldParents: ['company'],
      key: 'hasLoyalProgram',
      style: { width: '170px', textAlign: 'center' },
      title: 'Loyal Program',
    },
    {
      dataType: DataType.String,
      field: 'name',
      fieldParents: ['product'],
      key: 'product.name',
      style: {
        width: '80px',
      },
      title: 'Product',
    },
    {
      dataType: DataType.Number,
      field: 'price',
      fieldParents: ['product'],
      format: (value: number) => {
        return `$${value}`;
      },
      key: 'product.price',
      style: { width: '150px', textAlign: 'right' },
      title: 'Price',
    },
    {
      dataType: DataType.Date,
      format: (value: Date) => value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      key: 'firstDealDate',
      title: 'First Deal Date',
    },
  ],
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
};

const CustomCellDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChange: OptionChangeFunc = (value) => {
    changeOptions({...option, ...value });
  };

  const [data, changeData] = useState(dataArray);
  const onDataChange: DataChangeFunc = (newValue) => {
    changeData(newValue);
  };
  return (
    <Table
      {...option}
      data={data}
      onOptionChange={onOptionChange}
      onDataChange={onDataChange}
    />
  );
};

export default CustomCellDemo;
