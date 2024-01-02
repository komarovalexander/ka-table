import * as React from 'react';

import { IHeaderFilterPopupProps } from '../../props';
import PopupContent from '../HeaderFilterPopupContent/HeaderFilterPopupContent';
import { updateHeaderFilterPopupState } from '../../actionCreators';
import { useOuterClick } from '../../hooks/UseOuterClick';

const HeaderFilterPopup: React.FC<IHeaderFilterPopupProps> = (props) => {
    const {
        column,
        dispatch,
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
            <PopupContent {...props} />
        </div>
    )
}

export default HeaderFilterPopup;
