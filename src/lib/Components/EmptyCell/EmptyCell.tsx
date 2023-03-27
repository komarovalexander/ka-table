import * as React from 'react';

import { IEmptyCellProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const EmptyCell: React.FunctionComponent<IEmptyCellProps> = (props) => {
  const { index, isTh, isColGroup, childComponents } = props;
  const { elementAttributes } = getElementCustomization({
    className: 'ka-empty-cell' + (isTh ? ` ${defaultOptions.css.theadBackground} ${defaultOptions.css.theadFixed}` : ''),
  }, props, childComponents?.cellText);

  return isColGroup
    ? <col key={index} />
    : isTh
      ? <th key={index} {...elementAttributes}/>
      : <td key={index} {...elementAttributes}/>;
};

export default EmptyCell;
