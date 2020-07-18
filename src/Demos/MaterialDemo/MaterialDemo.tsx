import './MaterialDemo.scss';

import React, { useState } from 'react';
import { FormCheck, FormControl } from 'react-bootstrap';

import { ITableProps, kaReducer, Table } from '../../lib';
import { closeEditor, updateCellValue, updateFilterRowValue } from '../../lib/actionCreators';
import {
  ICellEditorProps, IFilterRowEditorProps,
} from '../../lib/Components/CellEditor/CellEditor';
import { ActionType, DataType, EditingMode, FilteringMode, SortingMode } from '../../lib/enums';
import { ChildComponents } from '../../lib/models';
import { DispatchFunc } from '../../lib/types';
import { useOuterClick } from './customHooks';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true, nextTry: new Date(2021, 10, 9) },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2021, 10, 8) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2021, 11, 8) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true, nextTry: new Date(2021, 12, 9) },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true, nextTry: new Date(2021, 11, 12) },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2021, 10, 9) },
];

const tablePropsInit: ITableProps = {
  columns: [
    { key: 'name', title: 'Name', dataType: DataType.String },
    { key: 'score', title: 'Score', dataType: DataType.Number, style: { width: 100 } },
    { key: 'passed', title: 'Passed', dataType: DataType.Boolean },
    { dataType: DataType.Date, key: 'nextTry', title: 'Next Try' },
  ],
  format: ({ column, value }) => {
    if (column.dataType === DataType.Date){
      return value && value.toLocaleDateString('en', {month: '2-digit', day: '2-digit', year: 'numeric' });
    }
  },
  data: dataArray,
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
  sortingMode: SortingMode.Single,
  filteringMode: FilteringMode.FilterRow
};

const CheckboxComponent = (props: any) => {
  const innerRef = useOuterClick(() => {
    props.dispatch(closeEditor(props.rowKeyValue, props.column.key));
  })
  return (
    <FormCheck ref={innerRef}
      checked={props.value}
      onClick={(e: any) => props.dispatch(updateCellValue(props.rowKeyValue, props.column.key, e.currentTarget.checked))} />
  )
}

const NumberInputComponent = (props: any) => {
  const innerRef = useOuterClick(() => {
    props.dispatch(closeEditor(props.rowKeyValue, props.column.key));
  })
  return (
    <FormControl ref={innerRef}
      placeholder={props.column.title}
      value={props.value}
      type={'number'}
      onChange={(event: any)  => {
        const newValue = event.currentTarget.value !== '' ? Number(event.currentTarget.value) : null;
        props.dispatch(updateCellValue(props.rowKeyValue, props.column.key, newValue))
      }}
    />
  )
}


const TextInputComponent = (props: any) => {
  const innerRef = useOuterClick(() => {
    props.dispatch(closeEditor(props.rowKeyValue, props.column.key));
  })
  return (
    <FormControl ref={innerRef}
      placeholder={props.column.title}
      value={props.value}
      onChange={(event) => props.dispatch(updateCellValue(props.rowKeyValue, props.column.key, event.currentTarget.value))}
    />
  )
}

const bootstrapChildComponents: ChildComponents = {
  table: {
    elementAttributes: {
      className: 'table table-striped table-hover'
    }
  },
  tableHead: {
    elementAttributes: {
      className: 'thead-dark'
    }
  },
  noDataRow: {
    content: () => 'No Data Found'
  },
  filterRowCell: {
    content: (props: IFilterRowEditorProps) => {
      const dispatch: DispatchFunc = (action) => {
        switch (action.type){
          case ActionType.UpdateCellValue: props.dispatch(updateFilterRowValue(action.columnKey, action.value)); break;
          default: props.dispatch(action);
        }
      };
      switch (props.column.dataType){
        case DataType.Boolean: return; // use default component
        case DataType.Number: return <NumberInputComponent {...props} dispatch={dispatch} value={props.column.filterRowValue} />;
        case DataType.Date: return; // use default component
        default: return <TextInputComponent {...props} dispatch={dispatch} value={props.column.filterRowValue} />;
      }
    }
  },
  cellEditor: {
    content: (props: ICellEditorProps) => {
      switch (props.column.dataType){
        case DataType.Boolean: return <CheckboxComponent  {...props} />;
        case DataType.Number: return <NumberInputComponent  {...props} />;
        case DataType.Date: return; // use default component
        default: return <TextInputComponent {...props}/>;
      }
    }
  }
};

const MaterialDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);

  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <div className='bootstrap-demo'>
      <Table
        {...tableProps}
        childComponents={bootstrapChildComponents}
        dispatch={dispatch}
      />
    </div>
  );
};

export default MaterialDemo;
