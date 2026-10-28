import EmptyCells from '../EmptyCells/EmptyCells';
import GroupExpandButton from '../GroupExpandButton/GroupExpandButton';
import { IGroupRowProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { useGroupKeyboardNavigation } from '../../hooks/UseKeyboardNavigation';

const GroupRowContent: React.FunctionComponent<IGroupRowProps> = (props) => {
    const {
        childComponents,
        contentColSpan,
        groupIndex,
        isExpanded,
        text,
    } = props;

    // with the keyboard navigation the cell gets the focus and tells the state of the group
    const keyboardNavigation = useGroupKeyboardNavigation(props);
    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.groupCell,
        colSpan: contentColSpan,
        ...(keyboardNavigation && { tabIndex: keyboardNavigation.tabIndex, onFocus: keyboardNavigation.onFocus, 'aria-expanded': isExpanded }),
    }, props, childComponents.groupCell);
    // a ref of the customization (elementAttributes) is kept
    const customRef = (elementAttributes as { ref?: React.Ref<HTMLTableCellElement> }).ref;
    const elementRef = keyboardNavigation?.elementRef;
    const mergedRef = React.useCallback((element: HTMLTableCellElement | null) => {
        if (elementRef) {
            elementRef.current = element;
        }
        if (typeof customRef === 'function') {
            customRef(element);
        } else if (customRef) {
            customRef.current = element;
        }
    }, [elementRef, customRef]);

    return (
        <>
            <EmptyCells count={groupIndex} childComponents={childComponents}/>
            <td {...elementAttributes} ref={elementRef && customRef ? mergedRef : elementRef || customRef}>
                <div className='ka-group-cell-content'>
                    <GroupExpandButton {...props}/>
                    {
                        content || <div className='ka-group-text'>{text}</div>
                    }
                </div>
            </td>
        </>
    );
};

export default GroupRowContent;
