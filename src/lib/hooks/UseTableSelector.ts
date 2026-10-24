import * as React from 'react';

import { ITableInstance, ITableProps } from '../Components/Table/Table';
import { isTableRendered, subscribeToTable } from '../Utils/TableInstanceUtils';

import { useIsomorphicLayoutEffect } from '../Utils/EffectUtils';

/**
 * Returns a value selected from the state of the table and re-renders the component when this value changes,
 * so the component can show the state of the table outside of it (selected rows, filters, page...).
 * Returns undefined until the table is rendered for the first time.
 * @param table the table instance created by useTable
 * @param selector gets the value from the table props
 * @param isEqual compares the previous and the new value (Object.is by default),
 * use it if the selector returns a new object or array every time
 */
export const useTableSelector = <T, TData = unknown>(
    table: ITableInstance<TData>,
    selector: (props: ITableProps<TData>) => T,
    isEqual: (value: T | undefined, newValue: T | undefined) => boolean = Object.is
): T | undefined => {
    const [, forceRender] = React.useReducer((count: number) => count + 1, 0);
    const selected = isTableRendered(table) ? selector(table.props) : undefined;

    const latest = React.useRef({ isEqual, selected, selector });
    useIsomorphicLayoutEffect(() => {
        latest.current = { isEqual, selected, selector };
    });

    useIsomorphicLayoutEffect(() => {
        const checkForUpdates = () => {
            const { isEqual: isSelectedEqual, selected: prevSelected, selector: getSelected } = latest.current;
            if (isTableRendered(table) && !isSelectedEqual(prevSelected, getSelected(table.props))) {
                forceRender();
            }
        };
        const unsubscribe = subscribeToTable(table, checkForUpdates);
        // the table could be rendered or changed after this component was rendered
        checkForUpdates();
        return unsubscribe;
    }, [table]);

    return selected;
};
