import * as React from 'react';

import '../../style.scss';
import { Column } from '../../models';

export interface PopupContentTextProps {
    column?: Column;
    content?: any;
}

const PopupConntentText: React.FC<PopupContentTextProps> = (props) => {
    const {
        column,
        content
    } = props;

    const columnKey: any = column?.key;

    return <div className='ka-popup-content-text-wrapper'>
        <div className='ka-popup-content-checkbox'>
            <input type="checkbox" />
        </div>
        <div className='ka-popup-content-text'>
            {content[columnKey].toLocaleString('cz-CZ')}
        </div>
    </div>
}

export default PopupConntentText;