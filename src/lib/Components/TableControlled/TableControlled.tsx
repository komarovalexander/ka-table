import * as React from 'react';

import { clearSingleAction } from '../../actionCreators';
import { PagingPosition } from '../../enums';
import { ChildComponents } from '../../Models/ChildComponents';
import { DispatchFunc } from '../../types';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isPagingShown } from '../../Utils/PagingUtils';
import Loading from '../Loading/Loading';
import Popup from '../Popup/Popup';
import { ITableAllProps, ITableProps } from '../Table/Table';
import { TablePaging } from '../TablePaging/TablePaging';
import { TableWrapper } from '../TableWrapper/TableWrapper';

export interface ITableControlledProps extends ITableProps {
  childComponents?: ChildComponents;
  dispatch: DispatchFunc;
}

export const TableControlled: React.FunctionComponent<ITableAllProps> = (props) => {
  const {
    childComponents,
    columns,
    dispatch,
    data,
    format,
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

  React.useEffect(() => {
    if (singleAction) {
      dispatch(singleAction);
      dispatch(clearSingleAction());
    }
  });


  return (
    <div {...elementAttributes}>
      {rootDivContent || (
        <>
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
  );
};
