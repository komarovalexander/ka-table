import React, { useState } from 'react';

import { ITableOption, Table } from '../../lib';
import { ActionType, DataType, EditingMode, FilteringMode } from '../../lib/enums';
import { FilterRowFuncPropsWithChildren, OptionChangeFunc } from '../../lib/types';
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
        autoFocus={true}
        defaultValue={column.filterRowValue}
        onChange={(event) => {
          dispatch(ActionType.ChangeFilterRow, { column: {...column, filterRowValue: toNullableBoolean(event.currentTarget.value)}});
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

const NumberEditor: React.FC<FilterRowFuncPropsWithChildren> = ({
  column, dispatch,
}) => {
  return (
    <div>
      <FilterOperators column={column} dispatch={dispatch}/>
      <input
        defaultValue={column.filterRowValue}
        onChange={(event) => {
          const filterRowValue = event.currentTarget.value !== '' ? Number(event.currentTarget.value) : null;
          dispatch(ActionType.ChangeFilterRow, { column: {...column, filterRowValue}});
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
      dataType: DataType.Boolean,
      editor: CustomLookupEditor,
      filterRowCell: CustomLookupEditor,
      filterRowValue: false,
      key: 'passed',
      title: 'Passed',
    },
    {
      dataType: DataType.String,
      filterRowCell: () => <></>,
      key: 'name',
      title: 'Name',
    },
    {
      dataType: DataType.Number,
      filterRowCell: NumberEditor,
      filterRowOperator: '>=',
      filterRowValue: 45,
      key: 'score',
      title: 'Score',
    },
    {
      dataType: DataType.Date,
      filterRowCell: DateEditor,
      filterRowOperator: '<=',
      filterRowValue: new Date(2021, 11, 11),
      format: (value: Date) => value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      key: 'nextTry',
      title: 'Next Try',
    },
  ],
  editingMode: EditingMode.Cell,
  filteringMode: FilteringMode.FilterRow,
  rowKeyField: 'id',
};

const FilterRowCustomEditorDemo: React.FC = () => {
  const [option, changeOptions] = useState(tableOption);
  const onOptionChange: OptionChangeFunc = (value) => {
    changeOptions({...option, ...value });
  };
  return (
    <Table
      {...option}
      data={dataArray}
      onOptionChange={onOptionChange}
    />
  );
};

export default FilterRowCustomEditorDemo;
