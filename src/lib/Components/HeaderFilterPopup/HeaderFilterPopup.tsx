import * as React from 'react';

import HeaderFilterPopupContent from '../HeaderFilterPopupContent/HeaderFilterPopupContent';
import { IHeaderFilterPopupProps } from '../../props';
import { getElementCustomization } from '../../Utils/ComponentUtils';
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

    const { elementAttributes, content } = getElementCustomization({
        className: 'ka-popup-content'
    }, props, childComponents?.headerFilterPopupContent
    );
    return (
        <div className='ka-popup' ref={refToElement}
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
