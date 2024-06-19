import { IFilterRowEditorProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { updateFilterRowValue } from '../../actionCreators';

const FilterRowString: React.FunctionComponent<IFilterRowEditorProps> = (props) => {
    const {
        column,
        dispatch,
        childComponents
    } = props;
    const { elementAttributes, content } = getElementCustomization<HTMLInputElement>({
        className: defaultOptions.css.textInput,
        type: 'search',
        value: column.filterRowValue || '',
        onChange: (event) => {
            dispatch(updateFilterRowValue(column.key, event.currentTarget.value));
        }
    }, props, childComponents?.filterRowCellInput);
    return (
        content || (<input {...elementAttributes} />)
    );
};

export default FilterRowString;
