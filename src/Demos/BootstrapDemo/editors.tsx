import React from 'react';

import { updateFilterRowOperator, updateFilterRowValue } from '../../lib/actionCreators';
import { Column } from '../../lib/models';
import { IFilterRowEditorProps } from '../../lib/props';
import { DispatchFunc } from '../../lib/types';
import { kaDateUtils } from '../../lib/utils';

export const CustomLookupEditor: React.FC<IFilterRowEditorProps> = ({
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
    <>
      <select
        className='form-control'
        defaultValue={column.filterRowValue}
        style={{width: 100}}
        onChange={(event) => {
          dispatch(updateFilterRowValue(column.key, toNullableBoolean(event.currentTarget.value)));
        }}>
        <option value=''/>
        <option value={'true'}>True</option>
        <option value={'false'}>False</option>
      </select>
    </>
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

export const NumberEditor: React.FC<IFilterRowEditorProps> = ({
  column, dispatch,
}) => {
  return (
    <>
      <FilterOperators column={column} dispatch={dispatch}/>
      <input
        defaultValue={column.filterRowValue}
        style={{width: 100}}
        onChange={(event) => {
          const filterRowValue = event.currentTarget.value !== '' ? Number(event.currentTarget.value) : null;
          dispatch(updateFilterRowValue(column.key, filterRowValue));
        }}
        type='number'
      />
    </>
  );
};

export const DateEditor: React.FC<IFilterRowEditorProps> = ({
  column, dispatch,
}) => {
  const fieldValue = column.filterRowValue;
  const value = fieldValue && kaDateUtils.getDateInputValue(fieldValue);
  return (
    <>
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
    </>
  );
};