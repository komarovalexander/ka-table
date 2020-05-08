import React from 'react';

import { newRowId } from '../../const';
import { EditingMode } from '../../enums';
import { ChildAttributes, EditableCell } from '../../models';
import { Column } from '../../Models/Column';
import { DispatchFunc } from '../../types';
import DataRow from '../DataRow/DataRow';

export interface INewRowProps {
  childAttributes: ChildAttributes;
  columns: Column[];
  dispatch: DispatchFunc;
  editableCells: EditableCell[];
  groupColumnsCount: number;
  rowKeyField: string;
}

const NewRow: React.FunctionComponent<INewRowProps> = ({
  childAttributes,
  columns,
  dispatch,
  editableCells,
  groupColumnsCount,
  rowKeyField,
}) => {
    return (
      <DataRow
        childAttributes={childAttributes}
        columns={columns}
        dispatch={dispatch}
        editableCells={editableCells}
        editingMode={EditingMode.None}
        groupColumnsCount={groupColumnsCount}
        isSelectedRow={false}
        rowData={{}}
        rowKeyField={rowKeyField}
        rowKeyValue={newRowId}
        selectedRows={[]}
      />
    );
};

export default NewRow;
