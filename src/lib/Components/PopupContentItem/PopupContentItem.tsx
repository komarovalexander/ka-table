import * as React from 'react';

import { IPopupContentItemProps } from '../../props';
import PopupContentItemText from '../PopupContentItemText/PopupContentItemText';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { updateHeaderFilterValues } from '../../actionCreators';

const PopupContentItem: React.FC<IPopupContentItemProps> = (props) => {
    const {
        column,
        childComponents,
        dispatch,
        item
    } = props;

    const checked: boolean = column.headerFilterValues?.includes(item) ?? false;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(updateHeaderFilterValues(column.key, item, event.currentTarget.checked));
    }

    const { elementAttributes, content } = getElementCustomization({
        className: `${defaultOptions.css.popupContentItem}`
    }, props, childComponents?.popupContentItem);

    return (
        <div {...elementAttributes}>
            {content || (
                <>
                    <div className='ka-popup-content-checkbox'>
                        <input
                            className='ka-input'
                            type='checkbox'
                            checked={checked}
                            onChange={handleChange}
                        />
                    </div>
                    <PopupContentItemText {...props} />
                </>
            )}
        </div>
    )
}

export default PopupContentItem;
