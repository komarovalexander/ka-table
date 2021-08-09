import * as React from 'react';

import './popupAnimation.css';
import { Column } from '../../models';
import { DispatchFunc } from '../../types';
import { updateHeaderFilterPopupState } from '../../actionCreators';

export interface PopupProps {
    column: Column;
    dispatch: DispatchFunc;
}

const Popup: React.FC<PopupProps> = (props) => {
    const {
        column,
        dispatch
    } = props;

    function useOuterClick(callback: () => void) {
        const callbackRef = React.useRef((event: MouseEvent) => { });
        const innerRef = React.useRef<HTMLDivElement>(document.createElement('div'));

        React.useEffect(() => {
            callbackRef.current = callback;
        });
        React.useEffect(() => {
            document.addEventListener("click", handleClick);
            return () => document.removeEventListener("click", handleClick);
            function handleClick(event: MouseEvent) {
                if (innerRef.current && callbackRef.current &&
                    !innerRef.current.contains(event.target as Node)
                )
                    callbackRef.current(event);
            }

        }, []);
        return innerRef;
    }

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
            <input type="checkbox" />
        </div>
    )
}

export default Popup;
