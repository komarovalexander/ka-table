import React from 'react';

import { ITableBodyProps } from '../../props';
import { getNewRowEditableCells } from '../../Utils/CellUtils';
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

  const newRowEditableCells = getNewRowEditableCells(editableCells);
  return (
    <>
      {
        !!newRowEditableCells?.length && (
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
