import React from 'react';

import { updateFilterRowValue } from '../../actionCreators';
import defaultOptions from '../../defaultOptions';
import { IFilterRowEditorProps } from '../../props';
import { getDateInputValue } from '../../Utils/DateUtils';

const FilterRowDate: React.FunctionComponent<IFilterRowEditorProps> = ({
    column,
    dispatch,
}) => {
    const fieldValue = column.filterRowValue;
    const value = fieldValue && getDateInputValue(fieldValue);
    return (
        <input
            className={defaultOptions.css.dateInput}
            type='date'
            value={value || ''}
            onChange={(event) => {
                const targetValue = event.currentTarget.value;
                const filterRowValue = targetValue ? new Date(targetValue) : null;
                dispatch(updateFilterRowValue(column.key, filterRowValue));
            }}
        />
    );
};

export default FilterRowDate;
