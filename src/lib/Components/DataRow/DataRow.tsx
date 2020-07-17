import React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { ChildComponents, EditableCell } from '../../models';
import { Column } from '../../Models/Column';
import { DataRowFunc, DispatchFunc, FormatFunc, ValidationFunc } from '../../types';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import DataRowContent from '../DataRowContent/DataRowContent';
import EmptyCells from '../EmptyCells/EmptyCells';

export interface IRowCommonProps {
  childComponents: ChildComponents;
  columns: Column[];
  dispatch: DispatchFunc;
  editableCells: EditableCell[];
  editingMode: EditingMode;
  rowData: any;
  rowKeyField: string;
  rowKeyValue: any;
  selectedRows: any[];
}

export interface IRowProps extends IRowCommonProps {
  rowEditableCells: EditableCell[],
  detailsRow?: DataRowFunc;
  format?: FormatFunc;
  groupColumnsCount: number;
  isDetailsRowShown: boolean;
  isSelectedRow: boolean;
  trRef?: any;
  validation?: ValidationFunc;
}

const DataRow: React.FunctionComponent<IRowProps> = (props) => {
  const {
    childComponents : { dataRow },
    groupColumnsCount,
    isSelectedRow,
    trRef,
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.row} ${isSelectedRow ? defaultOptions.css.rowSelected : ''}`,
  }, props, dataRow);

  return (
    <tr {...elementAttributes} ref={trRef} >
      <EmptyCells count={groupColumnsCount}/>
      {content
        ? <td className={defaultOptions.css.cell}>{content}</td>
        : <DataRowContent {...props}/>}
    </tr>
  );
};


export default DataRow;
