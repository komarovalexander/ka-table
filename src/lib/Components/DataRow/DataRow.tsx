import React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { DataRowFunc, EventFunc, RowDataChangedFunc } from '../../types';
import { getRowEditableCells } from '../../Utils/FilterUtils';
import DataRowContent from '../DataRowContent/DataRowContent';
import EmptyCells from '../EmptyCells/EmptyCells';

export interface IRowCommonProps {
  columns: Column[];
  editableCells: Cell[];
  editingMode: EditingMode;
  dispatch: EventFunc;
  onRowDataChanged: RowDataChangedFunc;
  rowData: any;
  rowKeyField: string;
  height?: number;
  selectedRows: any[];
}

export interface IRowProps extends IRowCommonProps {
  groupColumnsCount: number;
  dataRow?: DataRowFunc;
  trRef?: any;
}

const DataRow: React.FunctionComponent<IRowProps> = (props) => {
  const {
    editableCells,
    groupColumnsCount,
    height,
    rowData,
    rowKeyField,
    dataRow,
    selectedRows = [],
    trRef,
  } = props;
  const rowKeyValue = rowData[rowKeyField];
  const rowEditableCells = getRowEditableCells(rowKeyValue, editableCells);
  const isSelectedRow = selectedRows.some((s) => s === rowKeyValue);
  const dataRowProps = {...props, isSelectedRow, rowEditableCells, rowKeyValue };
  const dataRowContent = dataRow && dataRow(dataRowProps);
  return (
    <tr ref={trRef} style={{height}} className={`${defaultOptions.css.row} ${isSelectedRow ? defaultOptions.css.rowSelected : ''}`}>
      <EmptyCells count={groupColumnsCount}/>
      {dataRowContent
        ? <td className={defaultOptions.css.cell}>{dataRowContent}</td>
        : <DataRowContent {...dataRowProps}/>}
    </tr>
  );
};

export default DataRow;
