import * as React from 'react';

import { Column } from '../../models';
import { DispatchFunc, FormatFunc } from '../../types';
import { getValueByColumn } from '../../Utils/DataUtils';
import PopupContentItem from '../PopupContentItem/PopupContentItem';

export interface PopupContentProps {
    column: Column;
    data?: any[];
    dispatch: DispatchFunc;
    format?: FormatFunc;
}

const PopupContent: React.FC<PopupContentProps> = (props) => {
    const {
        column,
        data,
        dispatch,
        format
    } = props;

    let headerFilterValues = data?.map((item) => {
        const value = getValueByColumn(item, column);

        const formatedValue =
            (format && format({ column, value }))
            || value?.toString();
        return formatedValue;
    });

    headerFilterValues = Array.from(new Set(headerFilterValues));

    return (
        <div className='ka-popup-content'>
            {headerFilterValues?.map((item: any, index: number) => (
                <PopupContentItem
                    key={index}
                    column={column}
                    dispatch={dispatch}
                    item={item}
                />
            ))}
        </div>
    )
}

export default PopupContent;
