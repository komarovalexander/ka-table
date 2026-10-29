import * as React from 'react';

import FilterRowDataType from '../FilterRowDataType/FilterRowDataType';
import { IFilterRowEditorProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getFixedColumnClassName } from '../../Utils/ColumnUtils';
import { useAriaColIndex } from '../TableWrapper/ColumnIndexesContext';

const FilterCell: React.FunctionComponent<IFilterRowEditorProps> = (props) => {
    const {
        childComponents,
        column,
    } = props;
    const ariaColIndex = useAriaColIndex(column.key);
    const { elementAttributes, content } = getElementCustomization({
        className: `${defaultOptions.css.theadCell} ka-filter-row-cell ${defaultOptions.css.theadBackground} ${defaultOptions.css.theadFixed}`
            + getFixedColumnClassName(column),
        'aria-colindex': ariaColIndex,
        style: column.style
    }, props, childComponents?.filterRowCell);

    return (
        <td {...elementAttributes}>
            {
                column.isFilterable === false
                    ? <></>
                    : content
                        ? content
                        : (
                            <FilterRowDataType
                                {...props}
                            />
                        )
            }
        </td>
    );
};

export default FilterCell;
