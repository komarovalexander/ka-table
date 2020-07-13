import React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { ChildComponents, EditableCell } from '../../models';
import { Column } from '../../Models/Column';
import { DataRowFunc, DispatchFunc, FormatFunc, ValidationFunc } from '../../types';
import { extendProps } from '../../Utils/PropsUtils';
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
  dataRow?: DataRowFunc;
  detailsRow?: DataRowFunc;
  format?: FormatFunc;
  groupColumnsCount: number;
  isDetailsRowShown: boolean;
  isSelectedRow: boolean;
  trRef?: any;
  validation?: ValidationFunc;
}

function propsAreEqual(prevProps: IRowProps, nextProps: IRowProps) {
  return false;
}
const DataRow: React.FunctionComponent<IRowProps> = React.memo((props) => {
  const {
    childComponents,
    dataRow,
    groupColumnsCount,
    isSelectedRow,
    rowKeyValue,
    trRef,
  } = props;
  const dataRowProps = {...props, isSelectedRow, rowKeyValue };

  const componentProps: React.HTMLAttributes<HTMLTableRowElement> = {
    className: `${defaultOptions.css.row} ${isSelectedRow ? defaultOptions.css.rowSelected : ''}`,
  };

  const divProps = extendProps(componentProps, props, childComponents.dataRow);

  const dataRowContent = dataRow && dataRow(dataRowProps);
  return (
    <tr {...divProps} ref={trRef} >
      <EmptyCells count={groupColumnsCount}/>
      {dataRowContent
        ? <td className={defaultOptions.css.cell}>{dataRowContent}</td>
        : <DataRowContent {...dataRowProps}/>}
    </tr>
  );
}, propsAreEqual);

export default DataRow;
