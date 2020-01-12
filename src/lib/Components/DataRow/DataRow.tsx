import React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { ChildAttributes } from '../../models';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { DataRowFunc, DispatchFunc } from '../../types';
import DataRowContent from '../DataRowContent/DataRowContent';
import EmptyCells from '../EmptyCells/EmptyCells';

export interface IRowCommonProps {
  childAttributes: ChildAttributes;
  columns: Column[];
  dispatch: DispatchFunc;
  editableCells: Cell[];
  editingMode: EditingMode;
  rowData: any;
  rowKeyField: string;
  selectedRows: any[];
}

export interface IRowProps extends IRowCommonProps {
  groupColumnsCount: number;
  dataRow?: DataRowFunc;
  trRef?: any;
}

const DataRow: React.FunctionComponent<IRowProps> = (props) => {
  const {
    groupColumnsCount,
    rowData,
    rowKeyField,
    dataRow,
    selectedRows = [],
    trRef,
  } = props;
  const rowKeyValue = rowData[rowKeyField];
  const isSelectedRow = selectedRows.some((s) => s === rowKeyValue);
  const dataRowProps = {...props, isSelectedRow, rowKeyValue };
  const dataRowContent = dataRow && dataRow(dataRowProps);
  return (
    <tr ref={trRef} className={`${defaultOptions.css.row} ${isSelectedRow ? defaultOptions.css.rowSelected : ''}`}>
      <EmptyCells count={groupColumnsCount}/>
      {dataRowContent
        ? <td className={defaultOptions.css.cell}>{dataRowContent}</td>
        : <DataRowContent {...dataRowProps}/>}
    </tr>
  );
};

export default DataRow;
