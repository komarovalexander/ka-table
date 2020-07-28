import React, { useState } from 'react';

import { ITableProps, kaReducer, kaUtils, Table } from '../../lib';
import { updateFilterRowOperator, updateFilterRowValue } from '../../lib/actionCreators';
import { DataType, EditingMode, FilteringMode } from '../../lib/enums';
import { Column } from '../../lib/models';
import { IFilterRowEditorProps } from '../../lib/props';
import { DispatchFunc } from '../../lib/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true, nextTry: new Date(2021, 10, 9) },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2021, 12, 9) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2021, 7, 9) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true, nextTry: new Date(2021, 10, 12) },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true, nextTry: new Date(2021, 10, 15) },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2021, 10, 7) },
  { id: 7, name: 'Alex Brzowsky', score: 48, passed: false, nextTry: new Date(2021, 11, 11) },
];

const CustomLookupEditor: React.FC<IFilterRowEditorProps> = ({
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
          dispatch(updateFilterRowValue(column.key, toNullableBoolean(event.currentTarget.value)));
        }}>
        <option value=''/>
        <option value={'true'}>True</option>
        <option value={'false'}>False</option>
      </select>
    </div >
  );
};

const FilterOperators: React.FC<{ column: Column; dispatch: DispatchFunc }> = ({
  column, dispatch,
}) => {
  return (
    <select
      className='form-control'
      defaultValue={column.filterRowOperator}
      onChange={(event) => {
        dispatch(updateFilterRowOperator(column.key, event.currentTarget.value));
      }}>
      <option value={'='}>=</option>
      <option value={'<'}>{'<'}</option>
      <option value={'>'}>{'>'}</option>
      <option value={'<='}>{'<='}</option>
      <option value={'>='}>{'>='}</option>
    </select>
  );
};

const NumberEditor: React.FC<IFilterRowEditorProps> = ({
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
          dispatch(updateFilterRowValue(column.key, filterRowValue));
        }}
        type='number'
      />
    </div>
  );
};

const DateEditor: React.FC<IFilterRowEditorProps> = ({
  column, dispatch,
}) => {
  const fieldValue = column.filterRowValue;
  const value = fieldValue && kaUtils.date.getDateInputValue(fieldValue);
  return (
    <div>
      <FilterOperators column={column} dispatch={dispatch}/>
      <input
        type='date'
        value={value || ''}
        onChange={(event) => {
          const targetValue = event.currentTarget.value;
          const filterRowValue = targetValue ? new Date(targetValue) : null;
          dispatch(updateFilterRowValue(column.key, filterRowValue));
        }}
      />
    </div>
  );
};

const tablePropsInit: ITableProps = {
  columns: [
    {
      dataType: DataType.Boolean,
      filterRowValue: false,
      key: 'passed',
      style: {width: 90},
      title: 'Passed',
    },
    {
      dataType: DataType.String,
      key: 'name',
      style: {width: 100},
      title: 'Name',
    },
    {
      dataType: DataType.Number,
      filterRowOperator: '>=',
      filterRowValue: 45,
      key: 'score',
      style: {width: 120},
      title: 'Score',
    },
    {
      dataType: DataType.Date,
      filterRowOperator: '<=',
      filterRowValue: new Date(2021, 11, 11),
      key: 'nextTry',
      style: {width: 220},
      title: 'Next Try',
    },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  format: ({ column, value }) => {
    if (column.dataType === DataType.Date){
      return value && value.toLocaleDateString('en', {month: '2-digit', day: '2-digit', year: 'numeric' });
    }
  },
  filteringMode: FilteringMode.FilterRow,
  rowKeyField: 'id',
};

const FilterRowCustomEditorDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <Table
      {...tableProps}
      childComponents={{
        cellEditor: {
          content: (props) => {
            if (props.column.key === 'passed'){
              return <CustomLookupEditor {...props}/>
            }
          }
        },
        filterRowCell: {
          content: (props) => {
            switch (props.column.key){
              case 'passed': return <CustomLookupEditor {...props}/>;
              case 'name': return <></>;
              case 'score': return <NumberEditor {...props}/>;
              case 'nextTry': return <DateEditor {...props}/>;
            }
          }
        }
      }}
      dispatch={dispatch}
    />
  );
};

export default FilterRowCustomEditorDemo;
