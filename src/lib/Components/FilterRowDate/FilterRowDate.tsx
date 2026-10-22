import { IFilterRowEditorProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getDateFromInputValue, getDateInputValue } from '../../Utils/DateUtils';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { updateFilterRowValue } from '../../actionCreators';

const FilterRowDate: React.FunctionComponent<IFilterRowEditorProps> = (props) => {
    const {
        column,
        dispatch,
        childComponents,
    } = props;
    const fieldValue = column.filterRowValue;
    const value = fieldValue && getDateInputValue(fieldValue);

    const { elementAttributes, content } = getElementCustomization<HTMLInputElement>({
        className: defaultOptions.css.dateInput,
        'aria-label': column.title,
        type: 'date',
        value: value || '',
        onChange: (event) => {
            dispatch(updateFilterRowValue(column.key, getDateFromInputValue(event.currentTarget.value)));
        }
    }, props, childComponents?.filterRowCellInput);
    return (
        content || (
            <input {...elementAttributes} />
        )
    );
};

export default FilterRowDate;
