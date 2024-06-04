import * as React from 'react';

import HeaderFilterPopupContent from '../HeaderFilterPopupContent/HeaderFilterPopupContent';
import { IHeaderFilterPopupProps } from '../../props';
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
            <HeaderFilterPopupContent {...props} />
        </div>
    )
}

export default HeaderFilterPopup;
