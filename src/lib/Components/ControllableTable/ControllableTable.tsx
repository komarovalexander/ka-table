import * as React from 'react';

import { ITableAllProps } from '../..';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getPagesCountByProps } from '../../Utils/PropsUtils';
import Loading from '../Loading/Loading';
import Paging from '../Paging/Paging';
import { TableWrapper } from '../TableWrapper/TableWrapper';

export const ControllableTable: React.FunctionComponent<ITableAllProps> = (props) => {
  const {
    childComponents = {},
    dispatch = () => {},
    height,
    loading,
    paging,
    width
  } = props;

  const isLoadingActive = loading && loading.enabled;
  const kaCss = isLoadingActive ? 'ka ka-loading-active' : 'ka';

  const { elementAttributes, content: rootDivContent } = getElementCustomization({
    className:  kaCss
  }, { ...props, dispatch }, childComponents.rootDiv);
  elementAttributes.style = {width, height, ...elementAttributes.style}
  return (
    <div {...elementAttributes}>
      {rootDivContent || <TableWrapper {...props} />}
      <Paging
        {...paging}
        dispatch={dispatch}
        childComponents={childComponents}
        pagesCount={getPagesCountByProps(props)}
      />
      <Loading
        {...loading}
      />
    </div>
  );
};
