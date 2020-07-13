import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { ActionType, EditingMode } from '../../enums';
import { ChildComponents, EditableCell } from '../../models';
import { Column } from '../../Models/Column';
import { Group } from '../../Models/Group';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import {
  DataChangeFunc, DataRowFunc, DispatchFunc, FormatFunc, GroupRowFunc, NoDataRowFunc,
  ValidationFunc,
} from '../../types';
import TableBodyContent from '../TableBodyContent/TableBodyContent';

export interface ITableBodyProps {
  childComponents: ChildComponents;
  columns: Column[];
  data: any[];
  dataRow?: DataRowFunc;
  detailsRow?: DataRowFunc;
  detailsRows?: any[];
  dispatch: DispatchFunc;
  editableCells: EditableCell[];
  editingMode: EditingMode;
  format?: FormatFunc;
  groupColumnsCount: number;
  groupRow?: GroupRowFunc;
  groupedColumns: Column[];
  groups?: Group[];
  groupsExpanded?: any[][];
  noDataRow?: NoDataRowFunc;
  onDataChange?: DataChangeFunc;
  rowKeyField: string;
  selectedRows: any[];
  validation?: ValidationFunc;
  virtualScrolling?: VirtualScrolling;
}

const TableBody: React.FunctionComponent<ITableBodyProps> = (props) => {
  const { dispatch } = props;
  return (
    <tbody className={defaultOptions.css.tbody} onScroll={(event) => {
      dispatch({
        scrollLeft: event.currentTarget.scrollLeft,
        scrollTop: event.currentTarget.scrollTop,
        type: ActionType.ScrollTable,
      });
    }}>
      <TableBodyContent
        {...props}
      />
    </tbody>
  );
};

export default TableBody;
