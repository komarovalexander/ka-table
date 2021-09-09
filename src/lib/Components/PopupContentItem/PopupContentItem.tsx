import * as React from 'react';

import defaultOptions from '../../defaultOptions';
import { IPopupContentItemProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import PopupContentItemInput from '../PopupContentItemInput/PopupContentItemInput';
import PopupContentItemValue from '../PopupContentItemValue/PopupContentItemValue';


const PopupContentItem: React.FC<IPopupContentItemProps> = (props) => {
  const {
    column,
    childComponents,
    dispatch,
    item
  } = props;

  const { elementAttributes, content } = getElementCustomization({
    className: `${defaultOptions.css.popupContentItem}`
  }, props, childComponents?.popupContentItem
  );

  return (
    <div {...elementAttributes}>
      {content || (
        <>
          <PopupContentItemInput
            column={column}
            childComponents={childComponents}
            dispatch={dispatch}
            item={item}
          />
          <PopupContentItemValue
            childComponents={childComponents}
            item={item}
          />
        </>
      )}
    </div>
  )
}

export default PopupContentItem;
