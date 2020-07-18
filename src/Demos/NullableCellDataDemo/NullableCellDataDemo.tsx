import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { search, updateFilterRowValue } from '../../lib/actionCreators';
import { DataType, EditingMode, FilteringMode, SortDirection, SortingMode } from '../../lib/enums';
import { IFilterRowEditorProps } from '../../lib/props';
import { DispatchFunc } from '../../lib/types';
import { kaDateUtils } from '../../lib/utils';
import dataArray from './data';

const CustomDateFilterEditor: React.FC<IFilterRowEditorProps> = ({
  column, dispatch,
}) => {
  const fieldValue = column.filterRowValue;
  const value = fieldValue && kaDateUtils.getDateInputValue(fieldValue);
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
      key: 'representative.name',
      style: { width: '120px' },
      title: 'Representative',
    },
    {
      dataType: DataType.Boolean,
      key: 'company.hasLoyalProgram',
      title: 'Loyal Program',
    },
    {
      dataType: DataType.String,
      filterRowValue: 'e',
      key: 'product.name',
      style: {
        width: '80px',
      },
      title: 'Product',
    },
    {
      dataType: DataType.Number,
      key: 'product.price',
      sortDirection: SortDirection.Ascend,
      style: {
        textAlign: 'right',
        width: '100px',
      },
      title: 'Product Price',
    },
    {
      dataType: DataType.Date,
      filterRowOperator: '<',
      filterRowValue: new Date(2015, 1, 2),
      key: 'firstDealDate',
      style: {
        textAlign: 'center',
        width: '165px',
      },
      title: 'First Deal Date',
    },
  ],
  data: dataArray,
  editingMode: EditingMode.Cell,
  format: ({ column, value }) => {
    if (column.key === 'company.hasLoyalProgram'){
      return `Loyal program: ${ value == null ? 'Unspecified' : (value ? 'Yes' : 'No')}`;
    }
    if (column.key === 'price'){
      return value == null ? '-' : `$${value}`;
    }
    if (column.dataType === DataType.Date){
      return value && value.toLocaleDateString('en', {month: '2-digit', day: '2-digit', year: 'numeric' });
    }
  },
  filteringMode: FilteringMode.FilterRow,
  groups: [{ columnKey: 'company.hasLoyalProgram' }],
  groupsExpanded: [[true]],
  rowKeyField: 'id',
  searchText: 'i',
  sortingMode: SortingMode.Single,
};

const NullableCellDataDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <>
      <input type='search' defaultValue={tableProps.searchText} onChange={(event) => {
        dispatch(search(event.currentTarget.value));
      }} className='top-element'/>
      <Table
        {...tableProps}
        childComponents={{
          filterRowCell: {
            content: (props) => {
              switch (props.column.key){
                case 'firstDealDate': return <CustomDateFilterEditor {...props}/>;
              }
            }
          }
        }}
        dispatch={dispatch}
      />
    </>
  );
};

export default NullableCellDataDemo;
