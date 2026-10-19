import * as React from 'react';

import { IEmptyCellProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const EmptyCell: React.FunctionComponent<IEmptyCellProps> = (props) => {
    const { isTh, isColGroup, childComponents } = props;
    const { elementAttributes } = getElementCustomization({
        className: 'ka-empty-cell' + (isTh ? ` ${defaultOptions.css.theadBackground} ${defaultOptions.css.theadFixed}` : ''),
    }, props, childComponents?.emptyCell);

    // a cell of the header without a title is not a header cell (th) for screen readers
    return isColGroup
        ? <col />
        : <td {...elementAttributes}/>;
};

export default EmptyCell;
