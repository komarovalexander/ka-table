import * as React from 'react';

import { updateHeaderFilterPopupState } from '../../actionCreators';
import { ChildComponents, Column } from '../../models';
import { DispatchFunc, FormatFunc } from '../../types';
import { useOuterClick } from '../../Utils/UseOuterClickUtil';
import PopupContent from '../PopupContent/PopupContent';

export interface IPopupProps {
  column: Column;
  childComponents?: ChildComponents;
  data?: any[];
  dispatch: DispatchFunc;
  format?: FormatFunc;
}

const Popup: React.FC<IPopupProps> = (props) => {
  const {
    column,
    childComponents,
    data,
    dispatch,
    format
  } = props;

  const refToElement = useOuterClick(() => {
    dispatch(updateHeaderFilterPopupState(column.key, !column.isHeaderFilterPopupShown));
  });

  return (
    <div className='ka-popup' ref={refToElement}
      style={{
        left: column.headerFilterPopupPosition?.x,
        top: column.headerFilterPopupPosition?.y,
      }}>
      <PopupContent
        column={column}
        childComponents={childComponents}
        data={data}
        dispatch={dispatch}
        format={format}
      />
    </div>
  )
}

export default Popup;
