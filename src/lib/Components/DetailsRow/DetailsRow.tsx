import EmptyCells from '../EmptyCells/EmptyCells';
import { IRowProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const DetailsRow: React.FunctionComponent<IRowProps> = (props) => {
    const { groupColumnsCount, childComponents, columns } = props;

    const { elementAttributes, content } = getElementCustomization({
        className: `${defaultOptions.css.detailsRow}`,
    }, props, childComponents.detailsRow);

    const { elementAttributes: cellElementAttributes, content: cellContent } = getElementCustomization({
        className: `${defaultOptions.css.detailsCell} ${defaultOptions.css.cell}`,
    }, props, childComponents.detailsCell);
    const renderContent = (cellContent || content);
    return (
        <tr {...elementAttributes} >
            <EmptyCells count={groupColumnsCount} childComponents={childComponents}/>
            {renderContent
        && <td colSpan={columns.length} {...cellElementAttributes}>{renderContent}</td>}
        </tr>
    );
};

export default DetailsRow;
