import * as React from 'react';

import { Column } from '../../models';
import { FormatFunc } from '../../types';
import { getValueByColumn } from '../../Utils/DataUtils';
import PopupContentRow from '../PopupContentText/PopupContentRow';

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

    column.headerFilterValues = [];

    data?.map((item) => {
        const value = getValueByColumn(item, column);

        const formatedValue =
            (format && format({ column, value }))
            || value?.toString();

        column.headerFilterValues?.push(formatedValue);
        let popupContentValues = column.headerFilterValues?.filter((v, index, array) => array.indexOf(v) === index);
        column.headerFilterValues = popupContentValues;
        return 0;
    });


    return <div className='ka-popup-content'>
        {column.headerFilterValues?.map((item: any, index: number) => (
            <PopupContentRow
                key={index}
                item={item}
            />
        ))}
    </div>
}

export default PopupContent;