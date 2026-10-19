import * as React from 'react';

import { CrossIcon } from '../../Icons/CrossIcon';
import HeadCellContent from '../HeadCellContent/HeadCellContent';
import { IGroupPanelCellProps } from '../../props';
import { SortingMode } from '../../enums';
import { buttonAttributes } from '../../Utils/AriaUtils';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getHeadCellClassName } from '../../Utils/HeadRowUtils';
import { ungroupColumn } from '../../actionCreators';

export const GroupPanelCell: React.FunctionComponent<IGroupPanelCellProps> = (props) => {
    const {
        column,
        dispatch,
        sortingMode = SortingMode.None,
        childComponents = {},
    } = props;
    const { elementAttributes, content } = getElementCustomization({
        className: `${defaultOptions.css.groupPanelCell} ${getHeadCellClassName(sortingMode)}`,
    }, props, childComponents.groupPanelCell);
    return (
        <div {...elementAttributes}>
            {content || (<>
                <HeadCellContent column={column} sortingMode={sortingMode} dispatch={dispatch} childComponents={childComponents} areAllRowsSelected={false} />
                <span
                    className={defaultOptions.css.groupPanelCellRemove}
                    {...buttonAttributes}
                    aria-label={`Ungroup ${column.title || column.key}`}
                    onClick={() => {
                        dispatch(ungroupColumn(column.key));
                    }}>
                    <CrossIcon />
                </span>
            </>)}
        </div>
    );
};
