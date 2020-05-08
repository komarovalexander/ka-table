import React from 'react';

import defaultOptions from '../../defaultOptions';
import { EditingMode } from '../../enums';
import { ChildAttributes, EditableCell } from '../../models';
import { Column } from '../../Models/Column';
import { DataRowFunc, DispatchFunc } from '../../types';
import { extendProps } from '../../Utils/PropsUtils';
import DataRowContent from '../DataRowContent/DataRowContent';
import EmptyCells from '../EmptyCells/EmptyCells';

export interface IRowCommonProps {
  childAttributes: ChildAttributes;
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
  groupColumnsCount: number;
  isSelectedRow: boolean;
  dataRow?: DataRowFunc;
  trRef?: any;
}

const DataRow: React.FunctionComponent<IRowProps> = (props) => {
  const {
    childAttributes,
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

  const divProps = extendProps(componentProps, props, childAttributes.dataRow, props.dispatch);

  const dataRowContent = dataRow && dataRow(dataRowProps);
  return (
    <tr {...divProps} ref={trRef} >
      <EmptyCells count={groupColumnsCount}/>
      {dataRowContent
        ? <td className={defaultOptions.css.cell}>{dataRowContent}</td>
        : <DataRowContent {...dataRowProps}/>}
    </tr>
  );
};

export default DataRow;
