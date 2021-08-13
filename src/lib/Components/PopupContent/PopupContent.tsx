import * as React from 'react';

import { Column } from '../../models';
import { FormatFunc } from '../../types';
import PopupConntentRow from '../PopupContentText/PopupContentRow';

export interface PopupContentProps {
    column: Column;
    data?: any[];
    format?: FormatFunc;
}

const PopupContent: React.FC<PopupContentProps> = (props) => {
    const {
        column,
        data,
        format
    } = props;

    return <div className='ka-popup-content'>
        {data?.map((item: any) => (
            <div>
                <PopupConntentRow
                    key={item.id}
                    column={column}
                    format={format}
                    item={item}
                />
            </div>
        ))}
    </div>
}

export default PopupContent;