import * as React from 'react';

import { ITableAllProps } from '../..';
import Paging from '../Paging/Paging';
import { getPageIndex } from '../../Utils/PagingUtils';
import { useTableData } from '../../hooks/UseTableData';

export const TablePaging: React.FunctionComponent<ITableAllProps> = (props) => {
    const {
        childComponents = {},
        dispatch,
        paging,
    } = props;
    const { pagesCount } = useTableData(props);
    // the shown page: paging.pageIndex can be out of the pages until it is updated (see TableControlled)
    const pageIndex = getPageIndex(paging, pagesCount);
    return (
        <Paging
            {...paging}
            pageIndex={pageIndex}
            dispatch={dispatch}
            childComponents={childComponents}
            pagesCount={pagesCount}
        />
    );
}
