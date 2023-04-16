import './CustomEditorDemo.scss';

import { DataType, Table } from '../../lib';
import React, { useState } from 'react';
import { closeEditor, updateCellValue } from '../../lib/actionCreators';

import { EditingMode } from '../../lib/enums';
import { ICellEditorProps } from '../../lib/props';

const dataArray: any[] = [
  { id: 1, name: 'Mike Wazowski', score: 80, passed: true },
  { id: 2, name: 'Billi Bob', score: 55, passed: false, nextTry: new Date(2019, 10, 8, 10) },
  { id: 3, name: 'Tom Williams', score: 45, passed: false, nextTry: new Date(2019, 11, 8, 10) },
  { id: 4, name: 'Kurt Cobain', score: 75, passed: true },
  { id: 5, name: 'Marshall Bruce', score: 77, passed: true },
  { id: 6, name: 'Sunny Fox', score: 33, passed: false, nextTry: new Date(2019, 10, 9, 10) },
];

const CustomEditor: React.FC<ICellEditorProps> = ({
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

const CustomLookupEditor: React.FC<ICellEditorProps> = ({
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

const CustomEditorDemo: React.FC = () => {
  return (
    <Table
      columns= {[
        { dataType: DataType.String, key: 'name', title: 'Name', width: 390 },
        { key: 'score', title: 'Score', dataType: DataType.Number, width: 90 },
        {
          dataType: DataType.Boolean,
          key: 'passed',
          width: 90,
          title: 'Passed',
        },
        {
          dataType: DataType.Date,
          key: 'nextTry',
          title: 'Next Try',
        },
      ]}
      format= {({ column, value }) => {
        if (column.dataType === DataType.Date){
          return value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' });
        }
      }}
      data={dataArray}
      editableCells={[{ columnKey: 'name', rowKeyValue: 1 }]}
      editingMode={'cell'}
      rowKeyField={'id'}
      childComponents={{
        table: {
          elementAttributes: () => ({
            className: 'custom-editor-demo-table'
          })
        },
        cellEditor: {
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
