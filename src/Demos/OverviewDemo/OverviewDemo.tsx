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
      style: { width: '20px' },
    },
    {
      dataType: DataType.String,
      field: 'name',
      fieldParents: ['representative'],
      key: 'representative.name',
      style: { width: '130px' },
      title: 'Representative Name',
    },
    {
      cell: CustomCell,
      dataType: DataType.Boolean,
      key: 'hasLoyalProgram',
      title: 'Loyal Program',
    },
    {
      dataType: DataType.String,
      field: 'name',
      fieldParents: ['company'],
      key: 'company.name',
      style: {
        width: '90px',
      },
      title: 'Company Name',
    },
    {
      dataType: DataType.String,
      field: 'name',
      fieldParents: ['product'],
      key: 'product.name',
      style: {
        width: '90px',
      },
      title: 'Product Name',
    },
    {
      dataType: DataType.Number,
      field: 'price',
      fieldParents: ['product'],
      format: (value: number) => {
        return `$${value}`;
      },
      key: 'product.price',
      style: {
        textAlign: 'right',
        width: '90px',
      },
      title: 'Product Price',
      validation: (value) => {
        if (value < 0) {
          return 'value can\'t be less than 0';
        }
        if (!value && value !== 0) {
          return 'value can\'t be undefined';
        }
      },
    },
    {
      dataType: DataType.Date,
      field: 'firstDealDate',
      format: (value: Date) => {
        const ageDifMs = Date.now() - value.getTime();
        const ageDate = new Date(ageDifMs);
        const count = Math.abs(ageDate.getUTCFullYear() - 1970);
        const dateString = value.toLocaleDateString('en', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
        return `${dateString} (${count} year${count === 1 ? '' : 's' } ago)`;
      },
      key: 'firstDealDate1',
      style: {
        textAlign: 'right',
        width: '130px',
      },
      title: 'First Deal Date',
    },
  ],
  editingMode: EditingMode.Cell,
  filteringMode: FilteringMode.FilterRow,
  groups: [{ columnKey: 'hasLoyalProgram' }],
  groupsExpanded: [[true]],
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
