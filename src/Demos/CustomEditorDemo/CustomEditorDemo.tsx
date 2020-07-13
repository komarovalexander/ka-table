import './CustomEditorDemo.scss';

import React, { useState } from 'react';

import { ITableProps, kaReducer, Table } from '../../lib';
import { closeEditor, updateCellValue } from '../../lib/actionCreators';
import { DataType, EditingMode } from '../../lib/enums';
import { DispatchFunc, EditorFuncPropsWithChildren } from '../../lib/types';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2019, 10, 8, 10) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2019, 11, 8, 10) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2019, 10, 9, 10) },
];

const CustomEditor: React.FC<EditorFuncPropsWithChildren> = ({
  column, rowKeyValue, dispatch, value,
}) => {
  const close = () => {
    dispatch(closeEditor(rowKeyValue, column.key));
  };
  const [editorValue, setValue] = useState(value);
  return (
    <div className='custom-editor'>
      <input
        className='form-control'
        type='text'
        value={editorValue}
        onChange={(event) => setValue(event.currentTarget.value)}/>
      <button className='custom-editor-button custom-editor-button-save'
        onClick={() => {
          dispatch(updateCellValue(rowKeyValue, column.key, editorValue));
          close();
        }}>Save</button>
      <button className='custom-editor-button custom-editor-button-cancel' onClick={close}>Cancel</button>
    </div>
  );
};

const CustomLookupEditor: React.FC<EditorFuncPropsWithChildren> = ({
  column, dispatch, rowKeyValue, value,
}) => {
  const close = () => {
    dispatch(closeEditor(rowKeyValue, column.key));
  };
  const [editorValue, setValue] = useState(value);
  return (
    <div>
      <select
        className='form-control'
        autoFocus={true}
        defaultValue={editorValue}
        onBlur={() => {
          dispatch(updateCellValue(rowKeyValue, column.key, editorValue));
          close();
        }}
        onChange={(event) => {
          setValue(event.currentTarget.value === 'true');
        }}>
        <option value={'true'}>True</option>
        <option value={'false'}>False</option>
      </select>
    </div >
  );
};

const tablePropsInit: ITableProps = {
  columns: [
    { dataType: DataType.String, key: 'name', title: 'Name', style: { width: '330px' } },
    { key: 'score', title: 'Score', dataType: DataType.Number, style: { width: '50px' } },
    {
      dataType: DataType.Boolean,
      key: 'passed',
      style: { width: '50px' },
      title: 'Passed',
    },
    {
      dataType: DataType.Date,
      key: 'nextTry',
      title: 'Next Try',
    },
  ],
  format: ({ column, value }) => {
    if (column.dataType === DataType.Date){
      return value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' });
    }
  },
  data: dataArray,
  editableCells: [{ columnKey: 'name', rowKeyValue: 1 }],
  editingMode: EditingMode.Cell,
  rowKeyField: 'id',
};

const CustomEditorDemo: React.FC = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };
  return (
    <Table
      {...tableProps}
      dispatch={dispatch}
      childComponents={{
        table: {
          elementAttributes: {
            className: 'custom-editor-demo-table'
          }
        },
        editor: {
          content: (props) => {
            switch (props.column.key) {
              case 'passed': return <CustomLookupEditor {...props}/>;
              case 'name': return <CustomEditor {...props}/>;
            }
          }
        }
      }}
    />
  );
};

export default CustomEditorDemo;
