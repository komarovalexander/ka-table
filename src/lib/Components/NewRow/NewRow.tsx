import React from 'react';

import { newRowId } from '../../const';
import { EditingMode } from '../../enums';
import { INewRowProps } from '../../props';
import DataRow from '../DataRow/DataRow';

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
        isDetailsRowShown={false}
        isSelectedRow={false}
        rowData={{}}
        rowKeyField={rowKeyField}
        rowKeyValue={newRowId}
        rowReordering={false}
        validation={validation}
        selectedRows={[]}
        rowEditableCells={editableCells}
      />
    );
};

export default NewRow;
