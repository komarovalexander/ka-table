import * as React from 'react';

import HeaderFilterPopupContent from '../HeaderFilterPopupContent/HeaderFilterPopupContent';
import { IHeaderFilterPopupProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getFocusableElements } from '../../Utils/AriaUtils';
import { updateHeaderFilterPopupState } from '../../actionCreators';
import { useOuterClick } from '../../hooks/UseOuterClick';

const HeaderFilterPopup: React.FC<IHeaderFilterPopupProps> = (props) => {
    const {
        column,
        dispatch,
        childComponents,
    } = props;

    const refToElement = useOuterClick(() => {
        dispatch(updateHeaderFilterPopupState(column.key, !column.isHeaderFilterPopupShown));
    });

    // the element which opened the popup gets the focus back when the popup is closed by Esc
    const openerRef = React.useRef<HTMLElement | null>(null);
    React.useEffect(() => {
        openerRef.current = document.activeElement as HTMLElement | null;
        getFocusableElements(refToElement.current)[0]?.focus({ preventScroll: true });
    }, [refToElement]);

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            event.stopPropagation();
            dispatch(updateHeaderFilterPopupState(column.key, false));
            openerRef.current?.focus();
        } else if (event.key === 'Tab') {
            // the focus stays in the popup: it is shown near the header, but rendered at the end of the table
            const focusableElements = getFocusableElements(refToElement.current);
            const first = focusableElements[0];
            const last = focusableElements[focusableElements.length - 1];
            if (document.activeElement === (event.shiftKey ? first : last)) {
                event.preventDefault();
                (event.shiftKey ? last : first)?.focus();
            }
        }
    };

    const { elementAttributes, content } = getElementCustomization({
        className: 'ka-popup-content'
    }, props, childComponents?.headerFilterPopupContent
    );
    return (
        <div className='ka-popup' ref={refToElement}
            role='dialog'
            aria-label={`Filter ${column.title || column.key}`}
            onKeyDown={onKeyDown}
            style={{
                left: column.headerFilterPopupPosition?.x,
                top: column.headerFilterPopupPosition?.y,
            }}>
            <div {...elementAttributes}>
                {content || <HeaderFilterPopupContent {...props} />}
            </div>
        </div>
    )
}

export default HeaderFilterPopup;
