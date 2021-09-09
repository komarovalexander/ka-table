import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { IPopupContentItemValueProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const PopupContentItemValue: React.FC<IPopupContentItemValueProps> = (props) => {
    const {
        childComponents,
        item
    } = props;

    const { elementAttributes, content } = getElementCustomization({
        className: `${defaultOptions.css.popupContentItemValue}`
    }, props, childComponents?.popupContentItemValue);

    return (
        <div {...elementAttributes}>
            {content || item}
        </div>)
}

export default PopupContentItemValue;