import * as React from 'react';

import { ActionType, PagingPosition } from '../../enums';
import { ITableAllProps, ITableProps } from '../Table/Table';

import { ChildComponents } from '../../Models/ChildComponents';
import { DispatchFunc } from '../../types';
import { GroupPanel } from '../GroupPanel/GroupPanel';
import Loading from '../Loading/Loading';
import Popup from '../Popup/Popup';
import { TablePaging } from '../TablePaging/TablePaging';
import { TableWrapper } from '../TableWrapper/TableWrapper';
import { clearSingleAction } from '../../actionCreators';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isPagingShown } from '../../Utils/PagingUtils';

export interface ITableControlledProps extends ITableProps {
    childComponents?: ChildComponents;
    dispatch: DispatchFunc;
}

export const TablePropsContext = React.createContext<ITableProps>({} as ITableProps);

export const TableControlled: React.FunctionComponent<ITableAllProps> = (props) => {
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

    const { elementAttributes, content: rootDivContent } = getElementCustomization({
        className: `ka ${isLoadingActive ? 'ka-loading-active' : ''}`
    }, props, childComponents?.rootDiv);
    elementAttributes.style = { width, height, ...elementAttributes.style }

    React.useEffect(() => {
        dispatch({ type: ActionType.ComponentDidMount });
    }, []);

    React.useEffect(() => {
        if (singleAction) {
            dispatch(singleAction);
            dispatch(clearSingleAction());
        }
    });

    return (
        <TablePropsContext.Provider value={props}>
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
        </TablePropsContext.Provider>
    );
};
