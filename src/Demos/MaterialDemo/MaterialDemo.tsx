import './MaterialDemo.scss';

import M from 'materialize-css';
import React, { useEffect, useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { updateFilterRowValue } from '../../lib/actionCreators';
import FilterRowBoolean from '../../lib/Components/FilterRowBoolean/FilterRowBoolean';
import { DataType, EditingMode, FilteringMode, SortingMode } from '../../lib/enums';
import { ChildComponents } from '../../lib/models';
import { DispatchFunc } from '../../lib/types';

const dataArray = Array(119).fill(undefined).map(
  (_, index) => ({
    column1: index % 2 === 0,
    column2: `column:2 row:${index}`,
    column3: index % 5,
    column4: new Date(2022, 11, index),
    id: index,
  }),
);

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'column1', title: 'Column 1', dataType: DataType.Boolean, style: {minWidth: 130}, filterRowValue: true },
    { key: 'column2', title: 'Column 2', dataType: DataType.String, style: {width: 240} },
    { key: 'column3', title: 'Column 3', dataType: DataType.Number, style: {width: 230}  },
    { key: 'column4', title: 'Column 4', dataType: DataType.Date, style: {minWidth: 100} },
  ],
  format: ({ column, value }) => {
    if (column.dataType === DataType.Date){
      return value && value.toLocaleDateString('en', {month: '2-digit', day: '2-digit', year: 'numeric' });
    }
  },
  paging: {
    enabled: true,
    pageSize: 7,
    pageIndex: 0
  },
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
  filteringMode: FilteringMode.FilterRow
};

const bootstrapChildComponents: ChildComponents = {
  noDataRow: {
    content: () => 'No Data Found'
  },
  filterRowCell: {
    content: (props) => {
      switch (props.column.key){
        case 'column1': return (
          <>
            <FilterRowBoolean {...props}/>
            <span
              onClick={(event) => {
                let filterRowValue: any = props.column.filterRowValue;
                filterRowValue = filterRowValue === false ? filterRowValue = undefined : !filterRowValue;
                props.dispatch(updateFilterRowValue(props.column.key, filterRowValue));
              }}/>
          </>
        );
      }
    }
  },
  pagingIndex: {
    elementAttributes: ({isActive}) => ({
      className: `page-item waves-effect ${(isActive ? 'active' : '')}`
    })
  },
  pagingPages: {
    elementAttributes: () => ({
      className: 'pagination'
    }),
  }
};

const MaterialDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  useEffect(() => M.AutoInit());
  return (
    <div className='material-demo'>
      <Table
        {...tableProps}
        childComponents={bootstrapChildComponents}
        dispatch={dispatch}
      />
    </div>
  );
};

export default MaterialDemo;
