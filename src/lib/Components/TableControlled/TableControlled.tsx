import * as React from 'react';

import { ActionType, PagingPosition } from '../../enums';
import { ITableAllProps, ITableProps } from '../Table/Table';
import { TableDataContext, useTableDataCalculation } from '../../hooks/UseTableData';

import { ChildComponents } from '../../Models/ChildComponents';
import { DispatchFunc } from '../../types';
import { GroupPanel } from '../GroupPanel/GroupPanel';
import Loading from '../Loading/Loading';
import Popup from '../HeaderFilterPopup/HeaderFilterPopup';
import { TablePaging } from '../TablePaging/TablePaging';
import { TableWrapper } from '../TableWrapper/TableWrapper';
import { clearSingleAction, updatePageIndex } from '../../actionCreators';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getEnabledGroups } from '../../Utils/GroupUtils';
import { useIsomorphicLayoutEffect } from '../../Utils/EffectUtils';
import { isPagingShown } from '../../Utils/PagingUtils';

export interface ITableControlledProps extends ITableProps {
    childComponents?: ChildComponents;
    dispatch: DispatchFunc;
}

export const TablePropsContext = React.createContext<ITableProps>({} as ITableProps);

export const TableControlled: React.FunctionComponent<ITableAllProps> = (tableProps) => {
    // the components get the enabled groups only: the disabled ones keep their settings in the state for groupColumn
    const groups = React.useMemo(() => getEnabledGroups(tableProps.groups), [tableProps.groups]);
    const props = groups === tableProps.groups ? tableProps : { ...tableProps, groups };
    const {
        childComponents,
        columns,
        dispatch,
        data,
        format,
        groupPanel,
        height,
        loading,
        width,
        paging,
        singleAction
    } = props;
    const isLoadingActive = loading && loading.enabled;
    const kaCss = isLoadingActive ? 'ka ka-loading-active' : 'ka';

    const { elementAttributes, content: rootDivContent } = getElementCustomization({
        className: kaCss
    }, props, childComponents?.rootDiv);
    elementAttributes.style = { width, height, ...elementAttributes.style }

    // the data is processed once for the table and the paging
    const tableData = useTableDataCalculation(props);

    // the page index is out of the pages when the rows of the last pages are filtered or deleted:
    // the last page is shown (see getPageData) and its index is set
    const pageIndex = paging?.enabled ? paging.pageIndex || 0 : 0;
    const lastPageIndex = Math.max((tableData?.pagesCount || 1) - 1, 0);
    useIsomorphicLayoutEffect(() => {
        if (pageIndex > lastPageIndex) {
            dispatch(updatePageIndex(lastPageIndex));
        }
    }, [dispatch, pageIndex, lastPageIndex]);

    // StrictMode runs the effects of a mounted component twice in the development mode: the table is mounted once
    const isMountDispatchedRef = React.useRef(false);
    React.useEffect(() => {
        if (!isMountDispatchedRef.current) {
            isMountDispatchedRef.current = true;
            dispatch({ type: ActionType.ComponentDidMount });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- dispatched once, when the table is mounted
    }, []);

    // singleAction is dispatched once: StrictMode runs the effect twice before the action is cleared,
    // and the same action can be set again after it is cleared
    const dispatchedSingleActionRef = React.useRef<ITableProps['singleAction']>(undefined);
    React.useEffect(() => {
        if (!singleAction) {
            dispatchedSingleActionRef.current = undefined;
        } else if (singleAction !== dispatchedSingleActionRef.current) {
            dispatchedSingleActionRef.current = singleAction;
            dispatch(singleAction);
            dispatch(clearSingleAction());
        }
    });

    return (
        <TablePropsContext.Provider value={props}>
            <TableDataContext.Provider value={tableData}>
                <div {...elementAttributes}>
                    {rootDivContent || (
                        <>
                            {groupPanel?.enabled && <GroupPanel {...props} groupPanel={groupPanel}/>}
                            {isPagingShown(PagingPosition.Top, paging) && <TablePaging {...props} />}
                            <TableWrapper {...props} />
                            {isPagingShown(PagingPosition.Bottom, paging) && <TablePaging {...props} />}
                            <Loading {...loading} childComponents={childComponents}/>
                            {columns.map(column =>
                                column.isHeaderFilterPopupShown
                  && (
                      <Popup
                          key={column.key}
                          column={column}
                          childComponents={childComponents}
                          data={data}
                          dispatch={dispatch}
                          format={format}
                      />
                  )
                            )}
                        </>
                    )}
                </div>
            </TableDataContext.Provider>
        </TablePropsContext.Provider>
    );
};
