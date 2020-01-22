import './OverviewDemo.scss';

import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { ActionType, DataType, EditingMode, FilteringMode, SortingMode } from '../../lib/enums';
import { Cell } from '../../lib/models';
import {
  CellFuncPropsWithChildren, DataChangeFunc, FilterRowFuncPropsWithChildren, OptionChangeFunc,
} from '../../lib/types';
import { dateUtils } from '../../lib/utils';
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

const FilterOperators: React.FC<FilterRowFuncPropsWithChildren> = ({
  column, dispatch,
}) => {
  return (
    <select
      className='form-control'
      defaultValue={column.filterRowOperator}
      onChange={(event) => {
        dispatch(ActionType.ChangeFilterRow, { column: {...column, filterRowOperator: event.currentTarget.value}});
      }}>
      <option value={'='}>=</option>
      <option value={'<'}>{'<'}</option>
      <option value={'>'}>{'>'}</option>
      <option value={'<='}>{'<='}</option>
      <option value={'>='}>{'>='}</option>
    </select>
  );
};

const CustomNumberFilterEditor: React.FC<FilterRowFuncPropsWithChildren> = ({
  column, dispatch,
}) => {
  return (
    <div>
      <FilterOperators column={column} dispatch={dispatch}/>
      <input
        defaultValue={column.filterRowValue}
        style={{width: 60}}
        onChange={(event) => {
          const filterRowValue = event.currentTarget.value !== '' ? Number(event.currentTarget.value) : null;
          dispatch(ActionType.ChangeFilterRow, { column: {...column, filterRowValue}});
        }}
        type='number'
      />
    </div>
  );
};

const CustomDateFilterEditor: React.FC<FilterRowFuncPropsWithChildren> = ({
  column, dispatch,
}) => {
  const fieldValue = column.filterRowValue;
  const value = fieldValue && dateUtils.getDateInputValue(fieldValue);
  return (
    <div>
      <FilterOperators column={column} dispatch={dispatch}/>
      <input
        type='date'
        value={value || ''}
        onChange={(event) => {
          const targetValue = event.currentTarget.value;
          const filterRowValue = targetValue ? new Date(targetValue) : null;
          const updatedColumn = {...column, filterRowValue};
          dispatch(ActionType.ChangeFilterRow, {column: updatedColumn});
        }}
      />
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
      style: { width: '120px' },
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
        width: '130px',
      },
      title: 'Company Name',
    },
    {
      dataType: DataType.String,
      field: 'name',
      fieldParents: ['product'],
      key: 'product.name',
      style: {
        width: '80px',
      },
      title: 'Product Name',
    },
    {
      dataType: DataType.Number,
      field: 'price',
      fieldParents: ['product'],
      filterRowCell: CustomNumberFilterEditor,
      filterRowOperator: '>',
      filterRowValue: 4000,
      format: (value: number) => {
        return `$${value}`;
      },
      key: 'product.price',
      style: {
        textAlign: 'right',
        width: '95px',
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
      filterRowCell: CustomDateFilterEditor,
      filterRowOperator: '<',
      filterRowValue: new Date(2015, 1, 2),
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
        width: '165px',
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
    <>
      <div className='overview-search-container'>
        <input type='search' defaultValue={option.search} onChange={(event) => {
          onOptionChange({ search: event.currentTarget.value });
        }} placeholder='type to search by data..' className='overview-search'/>
      </div>
      <Table
        {...option}
        data={data}
        childAttributes={{table: {className: 'overview-table'}}}
        onOptionChange={onOptionChange}
        onDataChange={onDataChange}
      />
    </>
  );
};

export default OverviewDemo;
