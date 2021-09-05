import * as React from 'react';

import { updateHeaderFilterPopupState } from '../../actionCreators';
import { Column } from '../../models';
import { DispatchFunc, FormatFunc } from '../../types';
import { useOuterClick } from '../../Utils/UseOuterClickUtil';
import PopupContent from '../PopupContent/PopupContent';

export interface PopupProps {
    column: Column;
    data?: any[];
    dispatch: DispatchFunc;
    format?: FormatFunc;
}

const Popup: React.FC<PopupProps> = (props) => {
    const {
        column,
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
                    data={data}
                    dispatch={dispatch}
                    format={format}
                />
        </div>
    )
}

export default Popup;
