import { IFilterRowEditorProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { updateFilterRowValue } from '../../actionCreators';

const FilterRowNumber: React.FunctionComponent<IFilterRowEditorProps> = (props) => {
    const {
        column,
        dispatch,
        childComponents
    } = props;
    const value = column.filterRowValue;

    const { elementAttributes, content } = getElementCustomization<HTMLInputElement>({
        className: defaultOptions.css.numberInput,
        type: 'number',
        value: value === null || value === undefined ? '' : value,
        onChange: (event) => {
            const filterRowValue = event.currentTarget.value !== '' ? Number(event.currentTarget.value) : null;
            dispatch(updateFilterRowValue(column.key, filterRowValue));
        }
    }, props, childComponents?.filterRowCellInput);
    return (
        content || (
            <input {...elementAttributes} />
        )
    );
};

export default FilterRowNumber;
