import React from 'react';

import { updateNewRow } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { ActionType, EditingMode } from '../../enums';
import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import { getField } from '../../Utils/ColumnUtils';
import { getValueByColumn, replaceValue } from '../../Utils/DataUtils';
import CellEditor from '../CellEditor/CellEditor';
import EmptyCells from '../EmptyCells/EmptyCells';

export interface INewRowProps {
  columns: Column[];
  dispatch: DispatchFunc;
  groupColumnsCount: number;
  rowData: any;
  rowKeyField: string;
}

const NewRow: React.FunctionComponent<INewRowProps> = ({
  columns,
  dispatch,
  groupColumnsCount,
  rowData,
  rowKeyField,
}) => {
    const dispatchWrapper: DispatchFunc = (action) => {
      if (action.type === ActionType.UpdateEditorValue) {
        const column = columns.find((c) => c.key === action.columnKey)!;
        const newRowData = replaceValue(rowData, column, action.value);
        dispatch(updateNewRow(newRowData))
      } else {
        dispatch(action);
      }
    };
    return (
      <tr className='ka-tr ka-add-row'>
        <EmptyCells count={groupColumnsCount}/>
        {columns.map((column) => (
          <td className={defaultOptions.css.cell} key={column.key} style={column.style}>
            <CellEditor
              column={column}
              dispatch={dispatchWrapper}
              autoFocus={false}
              editingMode={EditingMode.None}
              field={getField(column)}
              isSelectedRow={false}
              rowData={rowData}
              rowKeyField={rowKeyField}
              rowKeyValue={rowData[rowKeyField]}
              value={getValueByColumn(rowData, column)}
            />
          </td>
        ))}
      </tr >
    );
};

export default NewRow;
