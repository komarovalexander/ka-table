import * as React from 'react';

import CellEditor from '../CellEditor/CellEditor';
import CellText from '../CellText/CellText';
import { ICellProps } from '../../props';
import defaultOptions from '../../defaultOptions';
import { getElementCustomization } from '../../Utils/ComponentUtils';
import { getFixedColumnClassName } from '../../Utils/ColumnUtils';
import { useAriaColIndex } from '../TableWrapper/ColumnIndexesContext';
import { useCellKeyboardNavigation } from '../../hooks/UseKeyboardNavigation';

const CellComponent: React.FunctionComponent<ICellProps> = (props) => {
    const {
        treeDeep,
        treeArrowElement,
        childComponents,
        column,
        column: { style },
        isEditableCell,
    } = props;

    const keyboardNavigation = useCellKeyboardNavigation(props);
    const ariaColIndex = useAriaColIndex(column.key);
    const { elementAttributes, content } = getElementCustomization({
        className: `${defaultOptions.css.cell} ${treeDeep != null ? defaultOptions.css.treeCell : ''}${getFixedColumnClassName(column)}`,
        'aria-colindex': ariaColIndex,
        style,
        ...(keyboardNavigation && { tabIndex: keyboardNavigation.tabIndex, onFocus: keyboardNavigation.onFocus }),
    }, props, childComponents.cell);
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
        <td {...elementAttributes} ref={elementRef && customRef ? mergedRef : elementRef || customRef}>
            {treeDeep ? Array(treeDeep).fill(undefined).map((_, index) => <div key={index} className={defaultOptions.css.treeCellEmptySpace} />) : null}
            {content ||
        (
            <>
                {treeArrowElement}
                {isEditableCell ?
                    (
                        <CellEditor {...props} />
                    )
                    :
                    (
                        <CellText {...props} />
                    )}
            </>
        )
            }
        </td>
    );
};

export const CellComponentMemo = React.memo(CellComponent);

export default CellComponent;
