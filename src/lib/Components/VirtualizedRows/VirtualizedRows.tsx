import React, { RefObject } from 'react';

import { ActionType } from '../../enums';
import { ITableBodyProps } from '../../props';
import Rows from '../Rows/Rows';
import defaultOptions from '../../defaultOptions';
import { getNewRowEditableCells } from '../../Utils/CellUtils';
import { defaultTableWidth, getVirtualized, isVirtualScrollingEnabled } from '../../Utils/Virtualize';

const VirtualizedRows: React.FunctionComponent<ITableBodyProps> = (props) => {
    const {
        data,
        dispatch,
        virtualScrolling,
        editableCells,
        oddEvenRows,
    } = props;
    // virtualScrolling with enabled: false shows all the rows
    const enabledVirtualScrolling = isVirtualScrollingEnabled(virtualScrolling) ? virtualScrolling : undefined;

    const onFirstRowRendered = (firstRowRef: RefObject<HTMLElement | null>) => {
        if (firstRowRef
      && firstRowRef.current
      && (enabledVirtualScrolling
      && (!enabledVirtualScrolling.itemHeight
      || !enabledVirtualScrolling.tbodyHeight
      || (enabledVirtualScrolling.horizontal && !enabledVirtualScrolling.tableWidth)))) {
            const itemHeight = firstRowRef.current.offsetHeight || 40;
            const rootElement = firstRowRef.current.closest<HTMLElement>(`.${defaultOptions.css.root}`);
            const tbodyHeight =
                (rootElement && rootElement.offsetHeight)
                || 600;
            // the visible width of the wrapper which scrolls the columns
            const tableWidth = firstRowRef.current.closest<HTMLElement>(`.${defaultOptions.css.tableWrapper}`)?.clientWidth || defaultTableWidth;
            const newVirtualScrolling = {
                ...enabledVirtualScrolling,
                itemHeight: enabledVirtualScrolling.itemHeight || itemHeight,
                tbodyHeight: enabledVirtualScrolling.tbodyHeight || tbodyHeight,
                ...(enabledVirtualScrolling.horizontal && { tableWidth: enabledVirtualScrolling.tableWidth || tableWidth }),
            };
            dispatch({ type: ActionType.UpdateVirtualScrolling, virtualScrolling: newVirtualScrolling });
        }
    };

    let virtualizedData = data;
    let virtualized;
    let isFirstVisibleRowOdd;
    if (enabledVirtualScrolling) {
        const isNewRowShown = !!getNewRowEditableCells(editableCells)?.length;
        virtualized = getVirtualized(enabledVirtualScrolling, virtualizedData, isNewRowShown, oddEvenRows);
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
