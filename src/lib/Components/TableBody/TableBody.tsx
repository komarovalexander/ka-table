import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { ITableBodyProps } from '../../props';
import { areColumnsSameForRows } from '../../Utils/ColumnUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import TableBodyContent from '../TableBodyContent/TableBodyContent';

const TableBodyComponent: React.FunctionComponent<ITableBodyProps> = (props) => {
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

/**
 * The rows are rendered again with the table, except when only the header filter popups of the columns or, while a column
 * is resized by the mouse, the widths change and the other props are the same; the end of the resize renders the rows
 */
const areBodyPropsSame = (prevProps: ITableBodyProps, nextProps: ITableBodyProps): boolean => {
    if (prevProps.columns === nextProps.columns && prevProps.groupedColumns === nextProps.groupedColumns) {
        return false;
    }
    const isWidthIgnored = !!nextProps.columnResizeRef?.current;
    // the body gets all the props of the table
    const fields = new Set([...Object.keys(prevProps), ...Object.keys(nextProps)]) as Set<keyof ITableBodyProps>;
    return [...fields].every((field) => (field === 'columns' || field === 'groupedColumns'
        ? areColumnsSameForRows(prevProps[field], nextProps[field], isWidthIgnored)
        : prevProps[field] === nextProps[field]));
};

const TableBody = React.memo(TableBodyComponent, areBodyPropsSame);

export default TableBody;
