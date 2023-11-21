import DataRow from '../DataRow/DataRow';
import { EditingMode } from '../../enums';
import { INewRowProps } from '../../props';
import React from 'react';
import { getNewRowDataFromEditableCells } from '../../Utils/CellUtils';
import { newRowId } from '../../const';

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
            rowData={getNewRowDataFromEditableCells(editableCells, columns)}
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
