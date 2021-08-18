import * as React from 'react';

import { Column } from '../../models';
import { FormatFunc } from '../../types';

export interface PopupContentRowProps {
  column?: Column;
  item?: any;
  format?: FormatFunc;
}

const PopupContentRow: React.FC<PopupContentRowProps> = (props) => {
  const {
    item
  } = props;


  return <div className='ka-popup-content-text-wrapper'>
    <div className='ka-popup-content-checkbox'>
      <input type="checkbox" />
    </div>
    <div className='ka-popup-content-text'>
      {item}
    </div>
  </div>
}

export default PopupContentRow;