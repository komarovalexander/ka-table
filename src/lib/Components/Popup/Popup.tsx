import * as React from 'react';

import './popupAnimation.css';
import { Column } from '../../models';
import { DispatchFunc } from '../../types';
import { updateHeaderFilterPopupState } from '../../actionCreators';
import { useOuterClick } from '../../Utils/UseOuterClickUtil';

export interface PopupProps {
    column: Column;
    dispatch: DispatchFunc;
}

const Popup: React.FC<PopupProps> = (props) => {
    const {
        column,
        dispatch
    } = props;

    const refToElement = useOuterClick(() => {
        dispatch(updateHeaderFilterPopupState(column.key, !column.isHeaderFilterPopupShown));
    });

    return (
        <div className={'popup'} ref={refToElement}
            style={{
                left: column.headerFilterPopupPosition?.x,
                top: column.headerFilterPopupPosition?.y,
            }}>
            Popup for {column && column.title}
            <input type='checkbox' />
        </div>
    )
}

export default Popup;
