import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { ActionType, EditingMode } from '../../enums';
import { ChildAttributes } from '../../models';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { Group } from '../../Models/Group';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import {
  DataChangeFunc, DataRowFunc, DispatchFunc, GroupRowFunc, NoDataRowFunc,
} from '../../types';
import TableBodyContent from '../TableBodyContent/TableBodyContent';

export interface ITableBodyProps {
  childAttributes: ChildAttributes;
  columns: Column[];
  data: any[];
  dataRow?: DataRowFunc;
  dispatch: DispatchFunc;
  editableCells: Cell[];
  editingMode: EditingMode;
  groupColumnsCount: number;
  groupRow?: GroupRowFunc;
  groupedColumns: Column[];
  groups?: Group[];
  groupsExpanded?: any[][];
  noDataRow?: NoDataRowFunc;
  onDataChange?: DataChangeFunc;
  rowKeyField: string;
  selectedRows: any[];
  virtualScrolling?: VirtualScrolling;
}

const TableBody: React.FunctionComponent<ITableBodyProps> = (props) => {
  const { dispatch } = props;
  return (
    <tbody className={defaultOptions.css.tbody} onScroll={(event) => {
      dispatch(ActionType.ScrollTable, { scrollTop: event.currentTarget.scrollTop, timeStamp: event.timeStamp  });
    }}>
      <TableBodyContent
        {...props}
      />
    </tbody>
  );
};

export default TableBody;
