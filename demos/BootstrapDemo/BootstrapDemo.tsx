import './BootstrapDemo.scss';

import React from 'react';

import { DataType, Table } from 'ka-table';
import { EditingMode, FilteringMode, SortingMode } from 'ka-table/enums';
import { ChildComponents } from 'ka-table/models';
import { CustomLookupEditor, DateEditor, NumberEditor } from './editors';

const dataArray = Array(119).fill(undefined).map(
  (_, index) => ({
    column1: index % 2 === 0,
    column2: `column:2 row:${index}`,
    column3: index % 5,
    column4: new Date(2022, 11, index),
    id: index,
  }),
);

const bootstrapChildComponents: ChildComponents = {
  table: {
    elementAttributes: () => ({
      className: 'table table-striped table-hover table-bordered table-primary'
    })
  },
  tableHead: {
    elementAttributes: () => ({
      className: 'thead-dark'
    })
  },
  noDataRow: {
    content: () => 'No Data Found'
  },
  filterRowCell: {
    content: (props) => {
      const getEditor = () => {
        switch (props.column.key){
          case 'column1': return <CustomLookupEditor {...props}/>;
          case 'column2': return <></>;
          case 'column3': return <NumberEditor {...props}/>;
          case 'column4': return <DateEditor {...props}/>;
        }
      }
      return (
        <div className='d-flex'>{getEditor()}</div>
      )
    }
  },
  cellEditorInput: {
    elementAttributes: ({column}) => ({
      className: column.dataType === DataType.Boolean ? 'form-check-input' : undefined
    }),
  },
  pagingIndex: {
    elementAttributes: ({ isActive }) => ({
      className: `page-item ${(isActive ? 'active' : '')}`
    }),
    content: ({ text, isActive }) => <div className={`page-link ${(isActive ? 'active' : '')}`}>{text}</div>
  },
  pagingPages: {
    elementAttributes: () => ({
      className: 'pagination'
    }),
  }
};

const BootstrapDemo: React.FC = () => {
  return (
    <div className='bootstrap-demo'>
      <Table
        columns={[
          { key: 'column1', title: 'Column 1', dataType: DataType.Boolean, style: {minWidth: 130}   },
          { key: 'column2', title: 'Column 2', dataType: DataType.String, style: {width: 240} },
          { key: 'column3', title: 'Column 3', dataType: DataType.Number, filterRowOperator: '>', style: {width: 230}  },
          { key: 'column4', title: 'Column 4', dataType: DataType.Date, filterRowOperator: '<', style: {minWidth: 100} },
        ]}
        format= {({ column, value }) => {
          if (column.dataType === DataType.Date){
            return value && value.toLocaleDateString('en', {month: '2-digit', day: '2-digit', year: 'numeric' });
          }
        }}
        paging= {{
          enabled: true,
          pageSize: 7,
          pageIndex: 0
        }}
        data={dataArray}
        editingMode={EditingMode.Cell}
        rowKeyField={'id'}
        sortingMode={SortingMode.Single}
        filteringMode={FilteringMode.FilterRow}
        childComponents={bootstrapChildComponents}
      />
    </div>
  );
};

export default BootstrapDemo;
