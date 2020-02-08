import React, { RefObject } from 'react';

import { ActionType } from '../../enums';
import { getVirtualized } from '../../Utils/Virtualize';
import Rows from '../Rows/Rows';
import { ITableBodyProps } from '../TableBody/TableBody';

const VirtualizedRows: React.FunctionComponent<ITableBodyProps> = (props) => {
  const {
    data,
    dispatch,
    virtualScrolling,
  } = props;

  const onFirstRowRendered = (firstRowRef: RefObject<HTMLElement>) => {
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
        dispatch(ActionType.ChangeVirtualScrollingHeightSettings, { virtualScrolling: newVirtualScrolling });
    }
  };

  let virtualizedData = data;
  let virtualized;
  if (virtualScrolling) {
    virtualized = getVirtualized(virtualScrolling, virtualizedData);
    virtualizedData = virtualized.virtualizedData;
  }
  return (
    <>
      {virtualized && <tr style={{height: virtualized.beginHeight}} />}
      <Rows
        {...props}
        data={virtualizedData}
        onFirstRowRendered={onFirstRowRendered}/>
      {virtualized && <tr style={{height: virtualized.endHeight}} />}
    </>
  );
};

export default VirtualizedRows;
