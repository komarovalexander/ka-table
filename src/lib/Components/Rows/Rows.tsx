import React, { RefObject, useEffect, useRef } from 'react';

import { getGroupMark, getGroupText } from '../../Utils/GroupUtils';
import DataRow from '../DataRow/DataRow';
import GroupRow from '../GroupRow/GroupRow';
import { ITableBodyProps } from '../TableBody/TableBody';

export interface IRowsProps extends ITableBodyProps {
  onFirstRowRendered: (firstRowRef: RefObject<HTMLElement>) => any;
}

const Rows: React.FunctionComponent<IRowsProps> = (props) => {
  const {
    columns,
    data,
    dispatch,
    groupedColumns,
    groups = [],
    groupsExpanded = [],
    onFirstRowRendered,
    rowKeyField,
  } = props;
  const groupMark = getGroupMark();

  const firstRowRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    onFirstRowRendered(firstRowRef);
  }, [firstRowRef, onFirstRowRendered]);

  let rowRefLink: any = firstRowRef;
  return (
    <>
      {data.map((d) => {
      if (d.groupMark === groupMark) {
        const emptyColumnsCount = d.key.length - 1;
        const group = groups && groups[emptyColumnsCount];
        const column = group && groupedColumns.find((c) => c.key === group.columnKey);
        return (
          <GroupRow
            contentColSpan={columns.length - emptyColumnsCount + groups.length}
            dispatch={dispatch}
            emptyColumnsCount={emptyColumnsCount}
            groupKey={d.key}
            isExpanded={groupsExpanded.some((ge) => JSON.stringify(ge) === JSON.stringify(d.key))}
            text={getGroupText(d.value, column)}
            key={d.key}
          />
        );
      } else {
        const dataRow = (
          <DataRow
            {...props}
            trRef={rowRefLink}
            key={d[rowKeyField]}
            rowData={d}
          />
        );
        rowRefLink = undefined;
        return dataRow;
      }
    })}
  </>
  );
};

export default Rows;
