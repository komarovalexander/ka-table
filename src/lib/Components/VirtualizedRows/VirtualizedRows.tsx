import React, { RefObject } from 'react';

import defaultOptions from '../../defaultOptions';
import { ActionType } from '../../enums';
import { ITableBodyProps } from '../../props';
import { getVirtualized } from '../../Utils/Virtualize';
import Rows from '../Rows/Rows';

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
        const rootElement: any = firstRowRef.current.closest(`.${defaultOptions.css.root}`);
        const tbodyHeight =
          (rootElement && rootElement.offsetHeight)
          || 600;
        const newVirtualScrolling = {
          itemHeight,
          tbodyHeight,
          ...virtualScrolling,
        };
        dispatch({ type: ActionType.UpdateVirtualScrolling, virtualScrolling: newVirtualScrolling });
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
      {virtualized && <tr style={{height: virtualized.beginHeight}}><td style={{height: virtualized.beginHeight}}/></tr>}
      <Rows
        {...props}
        data={virtualizedData}
        onFirstRowRendered={onFirstRowRendered}/>
      {virtualized && (<tr style={{height: virtualized.endHeight}}><td style={{height: virtualized.endHeight}}/></tr>)}
    </>
  );
};

export default VirtualizedRows;
