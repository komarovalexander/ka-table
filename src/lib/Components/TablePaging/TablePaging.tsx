import * as React from 'react';

import { ITableAllProps } from '../..';
import Paging from '../Paging/Paging';
import { useTableData } from '../../hooks/UseTableData';

export const TablePaging: React.FunctionComponent<ITableAllProps> = (props) => {
    const {
        childComponents = {},
        dispatch,
        paging,
    } = props;
    const { pagesCount } = useTableData(props);
    return (
        <Paging
            {...paging}
            dispatch={dispatch}
            childComponents={childComponents}
            pagesCount={pagesCount}
        />
    );
}
