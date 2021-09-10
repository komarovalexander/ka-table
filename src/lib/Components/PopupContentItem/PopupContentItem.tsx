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

  let checkbox: boolean = false;

  if (column.headerFilterValues?.includes(item)) {
    checkbox = true;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    checkbox = event.currentTarget.checked;
    dispatch(updateHeaderFilterValues(column.key, checkbox, item));
  }

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.popupContentItem}`
  }, props, childComponents?.popupContentItem
  );



  return (
    <div {...elementAttributes}>
      {content || (
        <>
          <div className='ka-popup-content-checkbox'>
            <input
              className='ka-input'
              type='checkbox'
              checked={checkbox}
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
