import React, { useEffect, useRef } from 'react';

import { getGroupMark } from '../../Utils/GroupUtils';
import { getVirtualized } from '../../Utils/Virtualize';
import DataRow from '../DataRow/DataRow';
import GroupRow from '../GroupRow/GroupRow';
import { ITableBodyProps } from '../TableBody/TableBody';

const VirtualizedRows: React.FunctionComponent<ITableBodyProps> = (props) => {
  const {
    columns,
    data,
    groups = [],
    groupsExpanded = [],
    onOptionChange,
    rowKeyField,
    virtualScrolling,
  } = props;

  const groupMark = getGroupMark();
  const firstRowRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (firstRowRef
      && firstRowRef.current
      && (virtualScrolling
      && (!virtualScrolling.itemHeight
      || !virtualScrolling.tbodyHeight))) {
        const itemHeight = firstRowRef.current.offsetHeight || 40;
        const tbodyHeight =
          (firstRowRef.current.parentElement && firstRowRef.current.parentElement.offsetHeight)
          || 600;
        const newVirtualScrolling = {
          itemHeight,
          tbodyHeight,
          ...virtualScrolling,
        };
        onOptionChange({ virtualScrolling: newVirtualScrolling });
    }
  }, [firstRowRef, onOptionChange, virtualScrolling]);

  let virtualizedData = data;
  let virtualized;
  if (virtualScrolling) {
    virtualized = getVirtualized(virtualScrolling, virtualizedData);
    virtualizedData = virtualized.virtualizedData;
  }
  let rowRefLink: any = firstRowRef;
  return (
    <>
      {virtualized && <tr style={{height: virtualized.beginHeight}} />}
      {virtualizedData.map((d) => {
        if (d.groupMark === groupMark) {
          return (
            <GroupRow
              key={d.key}
              groupRowData={d}
              columns={columns}
              emptyColumnsCount={d.key.length - 1}
              groups={groups}
              groupsExpanded={groupsExpanded}
              onOptionChange={onOptionChange} />
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
      {virtualized && <tr style={{height: virtualized.endHeight}} />}
    </>
  );
};

export default VirtualizedRows;
