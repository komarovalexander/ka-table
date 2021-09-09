import * as React from 'react';
import { updateHeaderFilterValues } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';

import { IPopupContentItemInputProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const PopupContentItemInput: React.FC<IPopupContentItemInputProps> = (props) => {
    const {
        column,
        childComponents,
        dispatch,
        item
    } = props;

    let checkbox: boolean = false;

    if (column.headerFilterValues?.includes(item)) {
        checkbox = true;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        checkbox = event.currentTarget.checked;
        // move logic to reducer
        if (checkbox) {
            if (column.headerFilterValues === undefined) {
                column.headerFilterValues = [];
            }
            column.headerFilterValues.push(item);
            dispatch(updateHeaderFilterValues(column.key, column.headerFilterValues));
        } else {
            column.headerFilterValues = column.headerFilterValues?.filter((value) => value !== item);
            dispatch(updateHeaderFilterValues(column.key, column.headerFilterValues));
        }
    }

    const { elementAttributes, content } = getElementCustomization({
        className: `${defaultOptions.css.popupContentItemInput}`,
        type: 'checkbox',
        checked: checkbox,
        onChange: handleChange
    }, props, childComponents?.popupContentItemInput);

    return (
        content ||
        <input {...elementAttributes} />
    )
}

export default PopupContentItemInput;