import EmptyCells from '../EmptyCells/EmptyCells';
import GroupExpandButton from '../GroupExpandButton/GroupExpandButton';
import { IGroupRowProps } from '../../props';
import React from 'react';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';

const GroupRowContent: React.FunctionComponent<IGroupRowProps> = (props) => {
    const {
        childComponents,
        contentColSpan,
        groupIndex,
        text,
    } = props;

    const { elementAttributes, content } = getElementCustomization({
        className: defaultOptions.css.groupCell,
        colSpan: contentColSpan
    }, props, childComponents.groupCell);

    return (
        <>
            <EmptyCells count={groupIndex} childComponents={childComponents}/>
            <td {...elementAttributes}>
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
