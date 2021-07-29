import * as React from 'react';

import './popupAnimation.css';
import { Column } from '../../models';
import { DispatchFunc } from '../../types';
import { updateHeaderFilterPopupState } from '../../actionCreators';

export interface PopupProps {
    column: Column;
    dispatch: DispatchFunc;
    popupPosition?: {
        x: number,
        y: number
    }
}

const Popup: React.FC<PopupProps> = (props) => {
    const {
        column,
        dispatch,
        popupPosition
    } = props;

    return (
        <div tabIndex={1}
            ref={(el) => el?.focus({ preventScroll: true })}
            onBlur={() => dispatch(updateHeaderFilterPopupState(column.key, !column.isHeaderFilterPopupShown))}
            className={'popup'}
            style={{
                left: popupPosition?.x,
                top: popupPosition?.y,
            }}>
            Popup for {column && column.title}
        </div>
    )
}

export default Popup;