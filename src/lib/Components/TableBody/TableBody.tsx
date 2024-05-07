import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { ITableBodyProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import TableBodyContent from '../TableBodyContent/TableBodyContent';

const TableBody: React.FunctionComponent<ITableBodyProps> = (props) => {
    const {
        childComponents,
    } = props;

    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.tbody,
    }, props, childComponents.tableBody);
    return (
        <tbody {...elementAttributes}>
            {content || <TableBodyContent {...props} />}
        </tbody>
    );
};

export default TableBody;
