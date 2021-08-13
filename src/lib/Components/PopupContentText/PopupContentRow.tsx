import * as React from 'react';

import { Column } from '../../models';
import { FormatFunc } from '../../types';
import { isEmpty } from '../../Utils/CommonUtils';

export interface PopupContentRowProps {
    column: Column;
    item?: any;
    format?: FormatFunc;
}

const PopupConntentText: React.FC<PopupContentRowProps> = (props) => {
    const {
        // column: { key: columnKey },
        column,
        item,
        format
    } = props;

    const value = item[column.key];

    let formattedValue: any = (format as FormatFunc)({ value, column });
    formattedValue = formattedValue || (!isEmpty(value) && value.toString());

    return <div className='ka-popup-content-text-wrapper'>
        <div className='ka-popup-content-checkbox'>
            <input type="checkbox" />
        </div>
        <div className='ka-popup-content-text'>
            {/* {content[columnKey].toLocaleString('en', { month: '2-digit', day: '2-digit', year: 'numeric' })} */}
            {formattedValue}
        </div>
    </div>
}

export default PopupConntentText;