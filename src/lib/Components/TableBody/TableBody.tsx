import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { ActionType, EditingMode } from '../../enums';
import { ChildAttributes } from '../../models';
import { Cell } from '../../Models/Cell';
import { Column } from '../../Models/Column';
import { Group } from '../../Models/Group';
import { VirtualScrolling } from '../../Models/VirtualScrolling';
import {
  DataChangeFunc, DataRowFunc, DispatchFunc, NoDataRowFunc, OptionChangeFunc,
} from '../../types';
import Rows from '../Rows/Rows';

export interface ITableBodyProps {
  childAttributes: ChildAttributes;
  columns: Column[];
  data: any[];
  dataRow?: DataRowFunc;
  dispatch: DispatchFunc;
  editableCells: Cell[];
  editingMode: EditingMode;
  groupColumnsCount: number;
  groupedColumns: Column[];
  groups?: Group[];
  groupsExpanded?: any[][];
  noDataRow?: NoDataRowFunc;
  onDataChange?: DataChangeFunc;
  onOptionChange: OptionChangeFunc;
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
      <Rows
        {...props}
      />
    </tbody>
  );
};

export default TableBody;
