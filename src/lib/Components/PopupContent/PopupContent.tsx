import * as React from 'react';
import defaultOptions from '../../defaultOptions';

import { IPopupContentProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getValueByColumn } from '../../Utils/DataUtils';
import PopupContentItem from '../PopupContentItem/PopupContentItem';


const PopupContent: React.FC<IPopupContentProps> = (props) => {
    const {
        column,
        childComponents,
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

    const { elementAttributes, content } = getElementCustomization({
        className: `${defaultOptions.css.popupContent}`
    }, props, childComponents?.popupContent
    );

    return (
        <div {...elementAttributes}>
            {content ||
        headerFilterValues?.map((item: any, index: number) => (
            <PopupContentItem
                key={index}
                column={column}
                childComponents={childComponents}
                dispatch={dispatch}
                item={item}
            />
        ))}
        </div>
    )
}

export default PopupContent;
