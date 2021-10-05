import * as React from 'react';

import { updateHeaderFilterValues } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { IPopupContentItemProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';

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
          <div className='ka-popup-content-item-value'>
            {item}
          </div>
        </>
      )}
    </div>
  )
}

export default PopupContentItem;
