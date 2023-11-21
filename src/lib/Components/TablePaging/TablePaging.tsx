import * as React from 'react';

import { ITableAllProps } from '../..';
import { getPagesCountByProps } from '../../Utils/PropsUtils';
import Paging from '../Paging/Paging';

export const TablePaging: React.FunctionComponent<ITableAllProps> = (props) => {
    const {
        childComponents = {},
        dispatch,
        paging,
    } = props;
    return (
        <Paging
            {...paging}
            dispatch={dispatch}
            childComponents={childComponents}
            pagesCount={getPagesCountByProps(props)}
        />
    );
}
