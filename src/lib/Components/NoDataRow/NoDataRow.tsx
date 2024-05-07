import { INoDataRowProps } from '../../props';
import React from 'react';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const NoDataRow: React.FunctionComponent<INoDataRowProps> = (props) => {
    const {
        childComponents,
        columns,
        groupColumnsCount,
        noData,
        loading
    } = props;
    const { elementAttributes, content } = getElementCustomization({
        className: 'ka-tr ka-no-data-row'
    }, props, childComponents.noDataRow);
    const { elementAttributes: cellElementAttributes, content: cellContent } = getElementCustomization({
        className: 'ka-no-data-cell'
    }, props, childComponents.noDataCell);
    return (
        <tr {...elementAttributes}>
            <td colSpan={columns.length + groupColumnsCount} {...cellElementAttributes}>
                {content || cellContent || (loading?.enabled ? '' : noData?.text)}
            </td>
        </tr>
    );
};

export default NoDataRow;
