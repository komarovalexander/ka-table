import * as React from 'react';

import { IPopupContentItemProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const PopupContentItemText: React.FC<IPopupContentItemProps> = (props) => {
    const {
        childComponents,
        item
    } = props;

    const { elementAttributes, content } = getElementCustomization({
        className: 'ka-popup-content-item-value'
    }, props, childComponents?.popupContentItemText);

    return (
        <div {...elementAttributes}>
            {content || item.toString()}
        </div>
    )
}

export default PopupContentItemText;
