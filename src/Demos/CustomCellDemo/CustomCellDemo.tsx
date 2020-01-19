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
    }}>
      {value ? 'Passed' : 'Failed'}
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
      key: 'representative.image',
      fieldParents: ['representative'],
      style: { width: '11%' },
      title: 'Image',
    },
    {
      dataType: DataType.String,
      field: 'name',
      key: 'representative.name',
      fieldParents: ['representative'],
      style: { width: '30%' },
      title: 'Name',
    },
    {
      cell: CustomCell,
      dataType: DataType.Boolean,
      key: 'hasLoyalProgram',
      style: { width: '30%', textAlign: 'center' },
      title: 'Loyal Program',
    },
    {
      dataType: DataType.Number,
      field: 'price',
      key: 'product.price',
      fieldParents: ['product'],
      style: { width: '10%', textAlign: 'right' },
      title: 'Price',
    },
    {
      dataType: DataType.Date,
      format: (value: Date) => value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      key: 'nextTry',
      title: 'Next Try',
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
