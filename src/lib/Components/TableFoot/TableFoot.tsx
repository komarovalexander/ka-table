import { FunctionComponent } from 'react';

import defaultOptions from '../../defaultOptions';
import { ITableFootProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { SummaryRow } from '../SummaryRow/SummaryRow';

export const TableFoot: FunctionComponent<ITableFootProps> = (props) => {
    const {
        childComponents
    } = props;
    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.tfoot,
    }, props, childComponents?.tableFoot);
    return (
        <tfoot {...elementAttributes}>
            {content || <SummaryRow {...props}/>}
        </tfoot>
    );
};
