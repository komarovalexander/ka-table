import { FC } from 'react';

import { deleteRow } from '../../lib/actionCreators';
import { ICellTextProps } from '../../lib/props';

export const DeleteRow: FC<ICellTextProps> = ({
    dispatch, rowKeyValue,
}) => {
    return (
        <img
            src='static/icons/delete.svg'
            className='delete-row-column-button'
            onClick={() => dispatch(deleteRow(rowKeyValue))}
            alt=''
        />
    );
};
