import * as React from 'react';

import { IPopupContentProps } from '../../props';
import PopupContentItem from '../PopupContentItem/PopupContentItem';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getValueByColumn } from '../../Utils/DataUtils';

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

        const formattedValue =
      (format && format({ column, value }))
      || value?.toString();
        return formattedValue;
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
