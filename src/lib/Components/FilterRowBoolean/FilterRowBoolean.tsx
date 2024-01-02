import { IFilterRowEditorProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { isEmpty } from '../../Utils/CommonUtils';
import { updateFilterRowValue } from '../../actionCreators';

const FilterRowBoolean: React.FunctionComponent<IFilterRowEditorProps> = (props) => {
    const {
        column,
        dispatch,
        childComponents
    } = props;
    const value = column.filterRowValue;

    const { elementAttributes, content } = getElementCustomization<HTMLInputElement>({
        className: defaultOptions.css.checkbox,
        type: 'checkbox',
        checked: value || false,
        onChange: (event) => {
            let filterRowValue: any = event.currentTarget.checked;
            if (value === false) {
                if (filterRowValue === true) {
                    filterRowValue = undefined;
                }
            }
            dispatch(updateFilterRowValue(column.key, filterRowValue));
        }
    }, props, childComponents?.filterRowCellInput);
    return (
        content || (<input
            ref={(elem) => elem && (elem.indeterminate = isEmpty(value))}
            {...elementAttributes}
        />)
    );
};

export default FilterRowBoolean;
