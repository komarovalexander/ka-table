import './OverviewDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { ActionType, DataType, EditingMode, FilteringMode, SortingMode } from '../../lib/enums';
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
      fieldParents: ['representative'],
      filterRowCell: () => <></>,
      key: 'representative.image',
      style: { width: '11%' },
      title: 'Image',
    },
    {
      dataType: DataType.String,
      field: 'name',
      fieldParents: ['representative'],
      key: 'representative.name',
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
      fieldParents: ['product'],
      key: 'product.price',
      style: {
        textAlign: 'right',
        width: '10%',
      },
      title: 'Price',
      validation: (value) => {
        if (value < 0) {
          return 'value can\'t be less than 0';
        }
      },
    },
    {
      dataType: DataType.Date,
      format: (value: Date) => value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      key: 'nextTry',
      title: 'Next Try',
    },
  ],
  editingMode: EditingMode.Cell,
  filteringMode: FilteringMode.FilterRow,
  groups: [{ columnKey: 'hasLoyalProgram' }],
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
};

const OverviewDemo: React.FC = () => {
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

export default OverviewDemo;
