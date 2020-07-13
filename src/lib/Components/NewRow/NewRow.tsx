import React from 'react';

import { newRowId } from '../../const';
import { EditingMode } from '../../enums';
import { ChildComponents, EditableCell } from '../../models';
import { Column } from '../../Models/Column';
import { DispatchFunc, FormatFunc, ValidationFunc } from '../../types';
import DataRow from '../DataRow/DataRow';

export interface INewRowProps {
  childComponents: ChildComponents;
  columns: Column[];
  dispatch: DispatchFunc;
  editableCells: EditableCell[];
  format?: FormatFunc;
  groupColumnsCount: number;
  rowKeyField: string;
  validation?: ValidationFunc;
}

const NewRow: React.FunctionComponent<INewRowProps> = ({
  childComponents,
  columns,
  dispatch,
  editableCells,
  format,
  groupColumnsCount,
  rowKeyField,
  validation,
}) => {
    return (
      <DataRow
        childComponents={childComponents}
        columns={columns}
        dispatch={dispatch}
        format={format}
        editableCells={editableCells}
        editingMode={EditingMode.None}
        groupColumnsCount={groupColumnsCount}
        isSelectedRow={false}
        isDetailsRowShown={false}
        rowData={{}}
        rowKeyField={rowKeyField}
        rowKeyValue={newRowId}
        validation={validation}
        selectedRows={[]}
      />
    );
};

export default NewRow;
