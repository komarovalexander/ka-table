import React from 'react';

import { newRowId } from '../../const';
import { ITableBodyProps } from '../../props';
import NewRow from '../NewRow/NewRow';
import NoDataRow from '../NoDataRow/NoDataRow';
import VirtualizedRows from '../VirtualizedRows/VirtualizedRows';

const TableBodyContent: React.FunctionComponent<ITableBodyProps> = (props) => {
  const {
    childComponents,
    columns,
    data,
    dispatch,
    editableCells,
    format,
    groupColumnsCount,
    rowKeyField,
    validation,
  } = props;

  const newRowEditableCells = editableCells && editableCells.filter(c => c.rowKeyValue === newRowId);
  return (
    <>
      {
        newRowEditableCells && !!newRowEditableCells.length && (
        <NewRow
          childComponents={childComponents}
          columns={columns}
          dispatch={dispatch}
          editableCells={newRowEditableCells}
          format={format}
          groupColumnsCount={groupColumnsCount}
          rowKeyField={rowKeyField}
          validation={validation}
        />
      )}
      {
        !data.length
        ? <NoDataRow {...props}/>
        : <VirtualizedRows {...props}/>
      }
    </>
  );
};

export default TableBodyContent;
