import React, { RefObject } from 'react';

import { ActionType } from '../../enums';
import { ITableBodyProps } from '../../props';
import Rows from '../Rows/Rows';
import defaultOptions from '../../defaultOptions';
import { getNewRowEditableCells } from '../../Utils/CellUtils';
import { getVirtualized } from '../../Utils/Virtualize';

const VirtualizedRows: React.FunctionComponent<ITableBodyProps> = (props) => {
    const {
        data,
        dispatch,
        virtualScrolling,
        editableCells,
        oddEvenRows,
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
    let isFirstVisibleRowOdd;
    if (virtualScrolling) {
        const isNewRowShown = !!getNewRowEditableCells(editableCells)?.length;
        virtualized = getVirtualized(virtualScrolling, virtualizedData, isNewRowShown, oddEvenRows);
        virtualizedData = virtualized.virtualizedData;
        isFirstVisibleRowOdd = virtualized.isFirstVisibleRowOdd;
    }
    return (
        <>
            {virtualized && virtualized.beginHeight !== 0 && <tr style={{height: virtualized.beginHeight}}><td style={{height: virtualized.beginHeight}}/></tr>}
            <Rows
                {...props}
                data={virtualizedData}
                onFirstRowRendered={onFirstRowRendered}
                isFirstRowOdd={isFirstVisibleRowOdd}/>
            {virtualized && virtualized.endHeight !== 0 && (<tr style={{height: virtualized.endHeight}}><td style={{height: virtualized.endHeight}}/></tr>)}
        </>
    );
};

export default VirtualizedRows;
