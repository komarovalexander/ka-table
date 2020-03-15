import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { changeFilterRowOperator, changeFilterRowValue } from '../../lib/actionCreators';
import { DataType, EditingMode, FilteringMode } from '../../lib/enums';
import { kaReducer } from '../../lib/reducers';
import { DispatchFunc, FilterRowFuncPropsWithChildren } from '../../lib/types';
import { dateUtils } from '../../lib/utils';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true, nextTry: new Date(2021, 10, 9) },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2021, 12, 9) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2021, 7, 9) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true, nextTry: new Date(2021, 10, 12) },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true, nextTry: new Date(2021, 10, 15) },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2021, 10, 7) },
  { id: 7, name: 'Alex Brzowsky', score: 48, passed: false, nextTry: new Date(2021, 11, 11) },
];

const CustomLookupEditor: React.FC<FilterRowFuncPropsWithChildren> = ({
  column, dispatch,
}) => {
  const toNullableBoolean = (value: any) => {
    switch (value) {
      case 'true': return true;
      case 'false': return false;
    }
    return value;
  };
  return (
    <div>
      <select
        className='form-control'
        defaultValue={column.filterRowValue}
        onChange={(event) => {
          dispatch(changeFilterRowValue(column.key, toNullableBoolean(event.currentTarget.value)));
        }}>
        <option value=''/>
        <option value={'true'}>True</option>
        <option value={'false'}>False</option>
      </select>
    </div >
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
        dispatch(changeFilterRowOperator(column.key, event.currentTarget.value));
      }}>
      <option value={'='}>=</option>
      <option value={'<'}>{'<'}</option>
      <option value={'>'}>{'>'}</option>
      <option value={'<='}>{'<='}</option>
      <option value={'>='}>{'>='}</option>
    </select>
  );
};

const NumberEditor: React.FC<FilterRowFuncPropsWithChildren> = ({
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
          dispatch(changeFilterRowValue(column.key, filterRowValue));
        }}
        type='number'
      />
    </div>
  );
};

const DateEditor: React.FC<FilterRowFuncPropsWithChildren> = ({
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
          dispatch(changeFilterRowValue(column.key, filterRowValue));
        }}
      />
    </div>
  );
};

const tableOption: ITableOption = {
  columns: [
    {
      dataType: DataType.Boolean,
      editor: CustomLookupEditor,
      filterRowCell: CustomLookupEditor,
      filterRowValue: false,
      key: 'passed',
      style: {width: 90},
      title: 'Passed',
    },
    {
      dataType: DataType.String,
      filterRowCell: () => <></>,
      key: 'name',
      style: {width: 100},
      title: 'Name',
    },
    {
      dataType: DataType.Number,
      filterRowCell: NumberEditor,
      filterRowOperator: '>=',
      filterRowValue: 45,
      key: 'score',
      style: {width: 120},
      title: 'Score',
    },
    {
      dataType: DataType.Date,
      filterRowCell: DateEditor,
      filterRowOperator: '<=',
      filterRowValue: new Date(2021, 11, 11),
      format: (value: Date) => value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      key: 'nextTry',
      style: {width: 220},
      title: 'Next Try',
    },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  filteringMode: FilteringMode.FilterRow,
  rowKeyField: 'id',
};

const FilterRowCustomEditorDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const dispatch: DispatchFunc = (action) => {
    changeOptions((prevState: ITableOption) => kaReducer(prevState, action));
  };
  return (
    <Table
      {...option}
      dispatch={dispatch}
    />
  );
};

export default FilterRowCustomEditorDemo;
