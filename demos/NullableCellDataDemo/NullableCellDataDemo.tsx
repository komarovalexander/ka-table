import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { search, updateFilterRowValue } from 'ka-table/actionCreators';
import { DataType, EditingMode, FilteringMode, SortDirection, SortingMode } from 'ka-table/enums';
import { DispatchFunc, FilterRowFuncPropsWithChildren } from 'ka-table/types';
import { dateUtils } from 'ka-table/utils';
import dataArray from './data';

const CustomDateFilterEditor: React.FC<FilterRowFuncPropsWithChildren> = ({
  column, dispatch,
}) => {
  const fieldValue = column.filterRowValue;
  const value = fieldValue && dateUtils.getDateInputValue(fieldValue);
  return (
    <div>
      <>Less than: </>
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
      dataType: DataType.String,
      field: 'name',
      fieldParents: ['representative'],
      key: 'representative.name',
      style: { width: '120px' },
      title: 'Representative',
    },
    {
      dataType: DataType.Boolean,
      fieldParents: ['company'],
      format: (value) => `Loyal program: ${ value == null ? 'Unspecified' : (value ? 'Yes' : 'No')}`,
      key: 'hasLoyalProgram',
      title: 'Loyal Program',
    },
    {
      dataType: DataType.String,
      field: 'name',
      fieldParents: ['product'],
      filterRowValue: 'e',
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
        return value == null ? '-' : `$${value}`  ;
      },
      key: 'product.price',
      sortDirection: SortDirection.Ascend,
      style: {
        textAlign: 'right',
        width: '95px',
      },
      title: 'Product Price',
    },
    {
      dataType: DataType.Date,
      field: 'firstDealDate',
      filterRowCell: CustomDateFilterEditor,
      filterRowOperator: '<',
      filterRowValue: new Date(2015, 1, 2),
      format: (value: Date) => value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      key: 'firstDealDate1',
      style: {
        textAlign: 'center',
        width: '165px',
      },
      title: 'First Deal Date',
    },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  filteringMode: FilteringMode.FilterRow,
  groups: [{ columnKey: 'hasLoyalProgram' }],
  groupsExpanded: [[true]],
  rowKeyField: 'id',
  search: 'i',
  sortingMode: SortingMode.Single,
};

const NullableCellDataDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <>
      <input type='search' defaultValue={tableProps.search} onChange={(event) => {
        dispatch(search(event.currentTarget.value));
      }} className='top-element'/>
      <Table
        {...tableProps}
        dispatch={dispatch}
      />
    </>
  );
};

export default NullableCellDataDemo;
