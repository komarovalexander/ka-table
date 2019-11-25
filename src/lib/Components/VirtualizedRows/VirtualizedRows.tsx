import React, { useEffect, useRef } from 'react';

import { Events } from '../../enums';
import groupMark from '../../groupMark';
import { getVirtualized } from '../../Utils/Virtualize';
import DataRow from '../DataRow/DataRow';
import GroupRow from '../GroupRow/GroupRow';
import { ITableBodyProps } from '../TableBody/TableBody';

const VirtualizedRows: React.FunctionComponent<ITableBodyProps> = (props) => {
  const {
    data,
    groupsExpanded = [],
    onEvent,
    onOptionChanged,
    rowKeyField,
    virtualScrolling,
  } = props;

  const firstRowRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (firstRowRef
      && firstRowRef.current
      && (virtualScrolling
      && (!virtualScrolling.itemHeight
      || !virtualScrolling.tbodyHeight))) {
      const itemHeight = firstRowRef.current.offsetHeight || 40;
      const tbodyHeight = firstRowRef.current.parentElement && firstRowRef.current.parentElement.offsetHeight  || 600;
      const newVirtualScrolling = {
        itemHeight,
        tbodyHeight,
        ...virtualScrolling,
      };
      onOptionChanged({ virtualScrolling: newVirtualScrolling });
    }
  }, [firstRowRef, onOptionChanged, virtualScrolling]);

  let virtualizedData = data;
  let virtualized;
  if (virtualScrolling) {
    virtualized = getVirtualized(virtualScrolling, virtualizedData);
    virtualizedData = virtualized.virtualizedData;
  }
  const rowDataChangedEvent = onEvent && onEvent.bind(null, Events.RowDataChanged);
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
              emptyColumnsCount={d.key.length - 1}
              groupsExpanded={groupsExpanded}
              onOptionChanged={onOptionChanged} />
          );
        } else {
          const dataRow = (
            <DataRow
              {...props}
              trRef={rowRefLink}
              key={d[rowKeyField]}
              rowData={d}
              onRowDataChanged={rowDataChangedEvent}
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
